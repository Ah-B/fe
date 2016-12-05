function initChat(roomId, userFName, userLName) {

    var socket = io.connect();
    var message = $('#message').val();
    var room = roomId;
    var userName = userFName.concat(" ", userLName);
    console.log(room);
    console.log(userName);



    $('#chatStart').click(function() {
        socket.emit('subscribe', {
            userName: userName,
            room: room
        });
    });


    socket.on('joined', function(ioUserName, users, numUsers) {

        $('#connectedUsers').empty();
        for (user of users) {
            if (user.room == room) {
                $('#connectedUsers').append("<p>" + user.userName + "</p>")
            }
        }

        if (ioUserName == userName) {
            $('#messages').append("<p class='notice' >Welcome</p>");
        } else {
            $('#messages').append("<p class='notice' >  " + ioUserName + " has joined the discussion </p>");
        };
        if (numUsers == 1) {
            $('#messages').append("<p class='notice' > You are the only user connected </p>");
        } else {
            $('#messages').append("<p class='notice' > There are " + numUsers + " users currently connected </p>");
        }
    });
    $('#message').keypress(function(e) {
        if (e.keyCode == 13) {
            var message = $('#message').val();
            socket.emit('send', {
                userName: userName,
                room: room,
                message: message
            });
        }
    });
    $('#send').click(function() {
        var message = $('#message').val();
        socket.emit('send', {
            userName: userName,
            room: room,
            message: message
        });
    });

    $('#stop').click(function() {
        socket.emit('unsubscribe', {
            userName: userName,
            room: room
        });
    });

    window.onbeforeunload = function() {
        socket.emit('unsubscribe', {
            userName: userName,
            room: room
        });
    };

    socket.on('leaving', function(data, numUsers, users) {
        $('#connectedUsers').empty();
        for (user of users) {
            $('#connectedUsers').append("<p>" + user.userName + "</p>")
        }

        $('#messages').append("<p class='notice'>" + data.userName + " has left the discussion </p>");

        if (numUsers == 1) {
            $('#messages').append("<p class='notice'> You are the only remaining connected user  </p>");
        } else {
            $('#messages').append("<p class='notice'> There are " + numUsers + " users currently connected </p>");
        }
    });

    socket.on('message', function(data) {
        console.log(data);
        $('#message').val('');
        $("#messages").append("<p>" + data.userName + " : " + data.message + "</p>");
        $('.typing').remove();

    });



    $('#message').focus(function() {
        socket.emit('focusIn', {
            userName: userName,
            room: room
        });
    });
    socket.on('writing', function(data) {
        if (data.userName !== userName) {
            $('#messages').append("<p class=typing>" + data.userName + " : is typing </p>");
        }
    })

    $('#message').focusout(function() {
        socket.emit('focusOut');
        console.log("focusOut");
    });

    socket.on('stopWriting', function() {
      $('.typing').remove();
    })





}
