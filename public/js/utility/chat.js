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
        $('#chatMessageContainer').empty();
        $('#chatMessageContainer').empty();
        $('#notice').empty();

        $('#connectedUsers').empty();
        for (user of users) {
            if (user.room == room) {
                $('#connectedUsers').append("<p>" + user.userName + "</p>")
            }
        }
        if (ioUserName == userName) {
            $('#notice').append("<p class='notice' >Welcome</p>");
        } else {
            $('#notice').append("<p class='notice' >  " + ioUserName + " has joined the discussion </p>");
        };
        if (numUsers == 1) {
            $('#notice').append("<p class='notice' > You are the only user connected </p>");
            $('#notice').append("<div class='space30'></div>");
        } else {
            $('#notice').append("<p class='notice' > There are " + numUsers + " users currently connected </p>");
            $('#notice').append("<div class='space30'></div>");
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
        var message ='<article id="myMessage" class="chat-item right"><a href="#" class="pull-right thumb-sm avatar"><img src="/template/images/a3.png" class="img-circle" alt="..."></a><section class="chat-body"><div class="panel bg-light text-sm m-b-none"><div class="panel-body"> <span class="arrow right"></span><p class="m-b-none">'+message+'</p></div></div></section></article>'
        $("#chatMessageContainer").append(message);

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
        $('#notice').append("<p class='notice'>" + data.userName + " has left the discussion </p>");
        if (numUsers == 1) {
            $('#notice').append("<p class='notice'> You are the only remaining connected user  </p>");
        } else {
            $('#notice').append("<p class='notice'> There are " + numUsers + " users currently connected </p>");
        }
    });

    socket.on('message', function(data) {
        $('#chatMessage').val('');
        $('.typing').remove();
        if (data.userName !== userName) {
          var message = '<article class="chat-item left"><div class="pull-left thumb-sm avatar"><img src="/template/images/a2.png" alt="..."></div><section class="chat-body"><div class="panel b-light text-sm m-b-none"><header class="panel-heading bg-white"> <p>'+data.userName+'</p></header><div class="panel-body"> <span class="arrow left bg-white"></span><p class="m-b-none">'+data.message+'</p></div></div> <small class="text-muted"><i class="fa fa-ok text-success"></i> 2 minutes ago</small> </section></article>';
          $("#chatMessageContainer").append(message);
        } else {

        }
        $("#notice").empty();
    });



    $('#chatMessage').focus(function() {
        socket.emit('focusIn', {
            userName: userName,
            room: room
        });
    });
    socket.on('writing', function(data) {

        if (data.userName !== userName) {
            $('#isTyping').append("<p class=typing>" + data.userName + " : is typing </p>");
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
