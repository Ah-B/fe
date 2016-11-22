        function showReader() {
            $('#reader').removeClass('zoomOut');
            $('#reader').addClass('animated fadeIn');
            $('#wrapper').toggle();
            $('#showReaderButton').toggle();
        };

        function hideReader() {
            $('#reader').addClass('zoomOut');
            $('#wrapper').toggle();
            $('#showReaderButton').toggle();
        };
