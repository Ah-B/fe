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
            $('.chatRoom').css('visibility', 'visible');
            $('.chatRoom').addClass('animated fadeInRight');
            $('body').css('overflow', 'hidden');
            $('.chatRoom').css('overflow-y', 'scroll');

        }

        function hideChat() {
            $('.chatRoom').removeClass('fadeInRight');
            $('.chatRoom').addClass('animated fadeOutRight');
            $('body').css('overflow', 'visible');

        }
