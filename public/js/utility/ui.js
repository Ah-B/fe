        function showReader() {
            $('#reader').removeClass('zoomOut');
            $('#reader').addClass('animated fadeIn');
            $('.ui').toggle();
        };

        function hideReader() {
            $('#reader').addClass('zoomOut');
        };

        $(window).onbeforeunload = function () {
            var message = 'Important: Please click on \'Save\' button to leave this page.';
            alert(message);

        };
