$(document).ready(function () {
    $.ajax({
        url: "/movies",
        method: "get",
    })
        .done(
            function (data) {
                
                $("#movies").empty();
                var content = "";
                $.each(data, function (key, movie) {
                    content += "<div><a href='/movies/details?id=" + movie._id + "'><img src='../uploads/" + movie.poster_path.filename + "' width='250' height='350'/></a></div>";
                });
                $("#movies").append(content);
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
    $('#search').keyup(function (){

        $.ajax({
            url: "/movies/search/" + $(this).val(),
            method: "get"
        })
            .done(
                function (data) {
                    $("#movies").empty();
                    var content = "";
                    $.each(data, function (key, movie) {
                       content += "<div><a href='/movies/details?id=" + movie._id + "'><img src='/uploads/" + movie.poster_path.filename + "' width='250' height='350'/></a>"
                       + "<p>" + movie.title + "</p></div>";
                    });
                    $("#movies").append(content);
                }
            )
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )
        
    })
})