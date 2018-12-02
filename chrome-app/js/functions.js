function getMp4LinkFromPage(title) {
    $.getJSON( "http://moonwalk.cc/api/videos.json?title=" + title +"&api_token=6eb82f15e2d7c6cbb2fdcebd05a197a2", function( data ) {

       data.forEach(function(elem, index){

           var year = '',
               genres = '';

           if (elem.type == 'movie') {
               video_type = 'video';
           } else {
               video_type = 'serial';
           }

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



