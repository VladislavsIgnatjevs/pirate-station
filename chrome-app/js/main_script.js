$(document).ready(function () {
    console.log('ready');

    $('#search_form').on("submit", function(event) {
        var data = $('#search_form').serializeJSON();
        event.preventDefault();

        var search = encodeURIComponent(jQuery.trim(data.search));

        $('.tablebody').empty();

         getMp4LinkFromPage(search);
    });


    $('body').on("click",'.watch_vid', function() {

        url =  $(this).first().attr('data-parent');

        $('#videoIframe').html('<webview id="webview" src="' + url +'" style="width:610px; height:370px" autosize="on"></webview>');
        $('#videoIframe').show();

        //adding event listener for full screen and permission confirmation
        var webview = document.getElementById('webview');

        webview.addEventListener('newwindow', function(e) {
            var newWebview = document.createElement('webview');
            document.body.appendChild(newWebview);
            e.window.attach(newWebview);
        });

        webview.addEventListener('permissionrequest', function(e) {
            if (e.permission === 'fullscreen') {
                e.request.allow();
            }
        });

    });







});







