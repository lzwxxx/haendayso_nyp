$(document).ready(function () {


    $("#showtimes").empty();
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id');

    var genre_ids = [];

    var cart = {
        movieID: movieId
    }


    $.ajax({
        url: "/movies/details/" + movieId, /// CALLS THE ROUTES TO RETURN THE REQUIRED EVENT BASED ON eventid
        method: "get"
    }).done(
        function (data) {
            var release_date = new Date(data.release_date);
            sessionStorage.setItem("title", data.title);
            $("#movieimg").append("<img src='../uploads/" + data.poster_path.filename + "' width='50%' height='auto'/>");
            $("#votecount").append("<b><p> Vote Count: </b>" + data.vote_count + "</p>");
            $('#title').append("<b><p> Title : </b>" + data.title + "</p>");
            $('#overview').append("<b><p> Overview : </b>" + data.overview + "</p>");
            $("#runtime").append("<b><p> Runtime : </b>" + data.runtime + " mins</p>");
            $('#releaseDate').append("<b><p> Release Date : </b>" + release_date.toISOString().slice(0, 10) + "</p>");

            for (d in data.genre_ids) {
                console.log(data.genre_ids[d]);
                genre_ids.push(data.genre_ids[d]);
            }
            getgenres();


        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $.ajax({
        url: "/reviews/" + movieId, /// CALLS THE ROUTES TO RETURN THE REQUIRED EVENT BASED ON eventid
        method: "get"
    }).done(
        function (data) {
            var content = "";
            $.each(data, function (key, reviews) {
                content += "<div id=newreviews>";
                content += "<p><b>" + reviews.username + "</b></p>";
                content += "<p>" + reviews.description + "</p>";
                content += "<p>Ratings: " + reviews.totalratings + " / 5 </p>";
                content += "</div>";
            });
            $("#reviews").append(content);
        }

    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $('input:checkbox').change(function () {
        $("#hidden").val("");
        var total = 0;
        $('input:checkbox:checked').each(function () { // iterate through each checked element.
            total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
        });
        $("#hidden").val(total);
        $("#counter").empty();
        $("#counter").append("Counter : " + total);

    });

    $(".send").click(function () {
        var review = {
            description: $("#description").val(),
            totalratings: $("#hidden").val()
        };
        $.ajax({
            url: "/reviews/" + movieId, /// CALLS THE ROUTES TO RETURN THE REQUIRED EVENT BASED ON eventid
            method: "post",
            data: review
        }).done(
            function (data) {
                alert(data);
                location.reload();
            }
        ).fail(
            function (err) {
                console.log(err);
                if(err.responseText == "Please Login") {
                    window.location.href = "/user/login"
                } else {
                    alert(err.responseText);
                }
                
            }
        );
    })

    $.ajax({
        url: "/showtimes/movie/" + movieId, /// CALLS THE ROUTES TO RETURN THE REQUIRED EVENT BASED ON eventid
        method: "get"
    }).done(
        function (data) {
            $.each(data, function (key, showtimes) {
                var content = "<div><b>" + showtimes.theatreID.name + "</b></div><ul><br>";
                for (s in showtimes.showtimes) {
                    var date = new Date(showtimes.showtimes[s].date);
                    content += "<li>" + date.toISOString().slice(0, 10) + "</li>";
                    cart.theatreID = showtimes.theatreID._id;
                    cart.hallID = showtimes.hallID._id;
                    cart.date = showtimes.showtimes[s].date;
                    for (t in showtimes.showtimes[s].time) {


                        cart.time = showtimes.showtimes[s].time[t];

                        content += "<form action='/cart' method='post'>";
                        content += "<input type='hidden' name='cart' value='" + JSON.stringify(cart) + "'/>";
                        content += "<input  id='showbutton' type='submit' value='" + showtimes.showtimes[s].time[t] + "' /></form>";
                    }
                }
                content += "</ul>";
                $("#showtimes").append(content);
            });
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    function getgenres() {
        $.ajax({
            url: "/genres",
            method: "get",
        })
            .done(function (data) {
                console.log(data);
                var content = "<b>Genres: </b>";
                var i = genre_ids.length - 1;
                $.each(data, function (key, value) {
                    for (g in genre_ids) {
                        if (value._id === genre_ids[g]) {


                            if (i < 1) {
                                content += value.name;
                            } else {
                                i--;
                                //alert(value.name);
                                content += value.name + ", ";
                            }

                        }
                    }

                });

                $("#genre").append(content);
            })
            .fail(
                function (err) {
                    console.log(err.responseText);
                });
    }
});

