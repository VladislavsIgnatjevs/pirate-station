function getFromSources(search) {

    var data,
        replace_data = [],
        xhr = new XMLHttpRequest();


    xhr.open("GET", "https://www3.123movie.cc/?s=" + search, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            data = jQuery.parseHTML(xhr.responseText);
            var movies = $('div.movies', data);



            movies.each(function(index){

                var container = $( this ).siblings()[1],
                    container_data,
                    title = '',
                    url = '';
                title = $('a.titlecover',container).first()[0].innerText;
                url = $('a',container).first().attr('href');

                var moviedata = [];



                // getMp4LinkFromPage(url);

                moviedata['title'] = title;
                moviedata['url'] = url;
                moviedata['imdb'] = 'https://www.imdb.com/find?q=' + encodeURIComponent(title) +'&s=all';
                replace_data.push(moviedata);


            });

            replace_data.forEach(function(elem, index){


                var friendlyindex = parseInt(index)+1;
                var row = '<tr><td id="id">' + friendlyindex +'</td><td id="name">' +elem.title + '</td><td id="url"><a target="_blank" style="color: #6c757d;" href="'+ elem.url + '">' + elem.url +'</a></td> <td id="imdb"><a style="color: #6c757d;" target="_blank" href="' + elem.imdb +'">IMDB</a></td></tr>';

                $('.tablebody').append(row);
            });

            //REMOTE CLASS "item movies"
        }
    };
    xhr.send();








}

function getMp4LinkFromPage(url) {


    xhrmp4 = new XMLHttpRequest();
    xhrmp4.open("GET", url, true);

    xhrmp4.onreadystatechange = function () {
        console.log('hey');
        if (xhrmp4.readyState == 4) {
            if (xhrmp4.status === 200) {
            // innerText does not let the attacker inject HTML elements.
            data = jQuery.parseHTML(xhrmp4.responseText);




            //get mp4
            var mp4 = $('video', data).first();


            }

        }
    };
        xhrmp4.send();


    console.log($.get(url));
}

