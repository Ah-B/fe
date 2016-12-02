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
            $('#notice').html("<p>Welcome</p>");
        } else {
            $('#notice').html("<p>" + ioUserName + " has joined the discussion </p>");
        };
        if (numUsers == 1) {
            $('#notice').append("<p> You are the only user connected </p>");
        } else {
            $('#notice').append("<p> There are " + numUsers + " users currently connected </p>");
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
    //Window Closing event
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

        $('#notice').html("<p>" + data.userName + " has left the discussion </p>");

        if (numUsers == 1) {
            $('#notice').append("<p> You are the only remaining connected user  </p>");
        } else {
            $('#notice').append("<p> There are " + numUsers + " users currently connected </p>");
        }
    });

    socket.on('message', function(data) {
        console.log(data);
        $("#messages").append("<p>" + data.userName + " : " + data.message + "</p>");
    });



    $('#message').focus(function() {
        socket.emit('focusIn', {
            userName: userName,
            room: room
        });
    });
    socket.on('writing', function(data) {
        if (data.userName !== userName) {
            $('#notice').html("<p id=typing>" + data.userName + " : is typing </p>");
        }
    })

    $('#message').focusout(function() {
        socket.emit('focusOut');
        console.log("focusOut");
    });

    socket.on('stopWriting', function() {
        $("#typing").remove();
    })





}
