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

    $('#send').click(function() {
        var message = $('#message').val();
        socket.emit('send', {
            userName: userName,
            room: room,
            message: message
        });
    });

    $('#stop').click(function() {
        socket.emit('unsubscribe', room);
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
            $('#writing').html("<p id=typing>" + data.userName + " : is typing </p>");
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
