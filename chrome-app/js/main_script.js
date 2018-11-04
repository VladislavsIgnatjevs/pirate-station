$(document).ready(function () {
    console.log('ready');

    $('#search_form').on("submit", function(event) {
        var data = $('#search_form').serializeJSON();
        event.preventDefault();

        var search = encodeURIComponent(jQuery.trim(data.search));
        console.log(search)

        $('.tablebody').empty();

        getFromSources(search);



    });







});







