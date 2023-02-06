$(document).ready(function () {
    $.ajax({
        url: "/movies",
        method: "get"
    })
        .done(
            function (data) {
                $("#movies").empty();
                $.each(data, function (key, movie) {
                    $("#movies").append("<p><a href='/admin/updatemovie?id=" + movie._id + "'>" + movie.title + "</a></p>");
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        );
});