        function showReader() {
            $('#reader').removeClass('zoomOut');
            $('#reader').addClass('animated fadeIn');
            $('.ui').toggle();
        };

        function hideReader() {
            $('#reader').addClass('zoomOut');
        };

        function showChat() {
            $('.chatRoom').removeClass('fadeOutRight');
            $('.chatBottomBar').removeClass('fadeOutRight');

            $('.chatRoom').css('visibility', 'visible');
            $('.chatRoom').addClass('animated fadeInRight');
            $('.chatBottomBar').addClass('animated fadeInRight');

            $('body').css('overflow', 'hidden');
            $('.chatRoom').css('overflow-y', 'scroll');
            $('#connectedUsers').css('visibility', 'visible');
            $('.chatBottomBar').css('visibility', 'visible');
        };

        function hideChat() {
            $('.chatRoom').removeClass('fadeInRight');
            $('.chatBottomBar').removeClass('fadeInRight');

            $('.chatRoom').addClass('animated fadeOutRight');
            $('.chatBottomBar').addClass('animated fadeOutRight');

            $('body').css('overflow', 'visible');
            $('#connectedUsers').css('visibility', 'hidden');
            $('.chatBottomBar').css('visibility', 'hidden');
        };
    
