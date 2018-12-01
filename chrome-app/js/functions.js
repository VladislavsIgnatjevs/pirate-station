function getFromSources(search) {

    var data,
        replace_data = [],
        xhr = new XMLHttpRequest();


    xhr.open("GET", "http://www.world-art.ru/search.php?public_search=" + search + "&global_sector=cinema", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            data = jQuery.parseHTML(xhr.responseText);
            var movies = $('a.estimation', data);

            movies.each(function(index){



                var container = $( this ),
                    url = 'http://www.world-art.ru/' + container.first().attr('href'),
                    id  = container.first().attr('href').replace('cinema/cinema.php?id=', '');



                year = $('font',container.parent().closest('tr')).eq(0)[0].innerText;
                title = $('font',container).first()[0].innerText + ' (' + year + ') ' + $('font',container.parent()).eq(1)[0].innerText;


                var moviedata = [];

                moviedata['title'] = title;
                moviedata['url'] = url;
                moviedata['mp4'] = mp4;
                moviedata['imdb'] = 'https://www.imdb.com/find?q=' + encodeURIComponent(title) +'&s=all';
                replace_data.push(moviedata);

                //crappy sort
                replace_data.sort(function(a, b){
                    var x = a.title.toLowerCase();
                    var y = b.title.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });


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

function getMp4LinkFromPage(title) {
    // moonwalk api tokens:
    // 6eb82f15e2d7c6cbb2fdcebd05a197a2
    // 858facbc8b7d9061761e8540f46a2b3b
    // 29b413aaa453a43fb4a91d81648aca5c
    //
    // hdgo api tokens:
    // aybpym3p0wi6keou7jbi5xqu
    // 0ijs9yfywb4qbxfx0a7klwwl
    // 88lx01lvhfioza84mifc15yn


    $.getJSON( "http://moonwalk.cc/api/videos.json?title=" + title +"&api_token=6eb82f15e2d7c6cbb2fdcebd05a197a2", function( data ) {

       data.forEach(function(elem, index){

           var year = '',
               genres = '';

           if (elem.type == 'movie') {
               video_type = 'video';
           } else {
               video_typ = 'serial';
           }

           console.log(elem);

           if (elem.material_data) {
               year = " (" +  elem.material_data.year +  ")";
               genres = elem.material_data.genres.join(', ');

           } else {
               if (elem.erotic_data) {
                   if (elem.erotic_data.genres) {
                       genres = elem.erotic_data.genres.join(', ');
                   }
               }
           }

            var friendlyindex = parseInt(index)+1;
            var row = '<tr><td id="id">'
                //index
                + friendlyindex
                //name
                +'</td><td id="name">'
                + (elem.title_ru == null ? '' : elem.title_ru ) + ' '
                + elem.title_en
               + year

                + '</td><td>'
                + genres
                +'</td><td id="url"><button type="button" data-parent="'
                + 'http://mastarti.com/'
                + video_type
                + '/'
                + elem.token
                +'/iframe?ref=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWZfaG9zdCI6ImFkdWx0bXVsdC50diIsInJlcV9ob3N0IjoibW9vbndhbGsuY2MiLCJleHAiOjE1NDM3MTcxNzEsInRva2VuIjoiN2RhMWYyOGFjZjYzZjRlNGM1OTBmOTllOGY5OWJkMjIifQ.YxM5oyOoOpNXz8MqGNp7ymPEDPRBw1pVlx0wNRunpSo'
                +'" class="watch_vid btn btn-success">Watch</button></td> '
                + '<td id="imdb"><a style="color: #6c757d;" target="_blank" href="'
                + 'https://www.kinopoisk.ru/film/'
                + elem.kinopoisk_id
                +'">Kinopoisk</a></td></tr>';


            $('.tablebody').append(row);
        });
    });
}



