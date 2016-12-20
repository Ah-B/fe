function initChat(roomId, userFName, userLName) {

    var socket = io.connect();
    var message = $('#chatMessage').val();
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
        $('#messages').html('');
        $('#connectedUsers').empty();
        for (user of users) {
            if (user.room == room) {
                $('#connectedUsers').append("<h4>" + user.userName + "</h4>")
            }
        }
        if (ioUserName == userName) {
            $('#messages').append("<h4 class='notice' >Welcome</h4>");
        } else {
            $('#messages').append("<h4 class='notice' >  " + ioUserName + " has joined the discussion </h4>");
        };
        if (numUsers == 1) {
            $('#messages').append("<h4 class='notice' > You are the only user connected </h4>");
            $('#messages').append("<div class='space30'></div>");
        } else {
            $('#messages').append("<h4 class='notice' > There are " + numUsers + " users currently connected </h4>");
            $('#messages').append("<div class='space30'></div>");
        }
    });
    $('#chatMessage').keypress(function(e) {
        if (e.keyCode == 13) {
            var message = $('#chatMessage').val();
            socket.emit('send', {
                userName: userName,
                room: room,
                message: message
            });
        }
    });
    $('#send').click(function() {
        var message = $('#chatMessage').val();
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
            $('#connectedUsers').append("<h4>" + user.userName + "</h4>")
        }

        $('#messages').append("<h4 class='notice'>" + data.userName + " has left the discussion </h4>");

        if (numUsers == 1) {
            $('#messages').append("<h4 class='notice'> You are the only remaining connected user  </h4>");
        } else {
            $('#messages').append("<h4 class='notice'> There are " + numUsers + " users currently connected </h4>");
        }
    });

    socket.on('message', function(data) {
        console.log(data);
        $('#chatMessage').val('');
        $("#messages").append("<h4> <strong> " + data.userName + " </strong>  : " + data.message + "</h4>");
        $('.typing').remove();

    });



    $('#chatMessage').focus(function() {
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

    $('#chatMessage').focusout(function() {
        socket.emit('focusOut');
        console.log("focusOut");
    });

    socket.on('stopWriting', function() {
      $('.typing').remove();
    })





}
