        function showReader() {
            $('#reader').removeClass('zoomOut');
            $('#reader').addClass('animated fadeIn');
            $('.ui').toggle();
        };

        function hideReader() {
            $('#reader').addClass('zoomOut');
        };

        function showChat() {


            // $('.chatRoom').removeClass('fadeOutRight');
            // $('.chatBottomBar').removeClass('fadeOutRight');


            $('#sidebar').toggle();
            $('#navData').hide();
            $('#mainContent').removeClass('col-lg-8');
            $('#mainContent').addClass('col-lg-12');
            $('#chatStart').attr("disabled", true);

            $('.chatRoom').addClass('animated fadeInRight');
            $('.chatBottomBar').addClass('animated fadeInRight');
            $('.chatExternalContent').addClass('animated fadeOutRight');
            $('.chatRoom').css('visibility', 'visible');
            // $('body').css('overflow', 'hidden');
            // $('.chatRoom').css('overflow-y', 'scroll');
            // $('#connectedUsers').css('visibility', 'visible');
            // $('.chatBottomBar').css('visibility', 'visible');

        };

        function hideChat() {

            $('#sidebar').toggle();
            $('#navData').show();

            $('#mainContent').removeClass('col-lg-12');
            $('#mainContent').addClass('col-lg-8');
            $('.chatRoom').removeClass('fadeInRight');
            $('.chatRoom').addClass('animated fadeOutRight');
            $('.chatRoom').css('visibility', 'hidden');
              $('#chatStart').attr("disabled", false);
            //
            //   $('body').css('overflow', 'visible');
            //   $('#connectedUsers').css('visibility', 'hidden');
            //   $('.chatBottomBar').css('visibility', 'hidden');
            //
            //   $('.chatExternalContent').removeClass('fadeOutRight');
            //   $('.chatExternalContent').addClass('animated fadeInRight');

        };
