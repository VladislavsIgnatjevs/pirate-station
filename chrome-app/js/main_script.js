$(document).ready(function () {
    console.log('ready');

    $('#search_form').on("submit", function(event) {
        var data = $('#search_form').serializeJSON();
        event.preventDefault();

        var search = encodeURIComponent(jQuery.trim(data.search));

        $('.tablebody').empty();

        // getFromSources(search);

        getMp4LinkFromPage(search);


    });


    $('body').on("click",'.watch_vid', function() {

        url =  $(this).first().attr('data-parent');


        $('#videoIframe').html('<webview src="' + url +'" style="width:610px; height:370px" autosize="on"></webview>');
        $('#videoIframe').show();
    });







});







