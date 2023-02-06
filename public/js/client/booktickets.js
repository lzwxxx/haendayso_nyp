$(document).ready(function () {

    var cart = {};
    sessionStorage.setItem("title", "");

    $.ajax({
        url: "/halls",
        method: "get"
    })
        .done(
            function (data) {
                var content = "<select name='halls'>";
                $.each(data, function (key, halls) {
                    content += "<option value='" + halls._id + "'>" + halls.name + "</option>";
                });
                content += "</select>";
                $("#halls").append(content);
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $.ajax({
        url: "/theatres",
        method: "get"
    })
        .done(
            function (data) {
                var content = "";
                $.each(data, function (key, theatres) {
                    content += "<option value='" + theatres._id + "'>" + theatres.name + "</option>";
                });
                $("#theatres").append(content);
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $(document).on('change', '#theatres', function () {
        console.log(this.value);
        if ($("#theatres").val().indexOf("select") >= 0) {
            $("#seating").empty();
            $("#m").children('option:not(:first)').remove();
            $("#date").children('option:not(:first)').remove();
            $("#time").children('option:not(:first)').remove();
        } else {
            $.ajax({
                url: "/showtimes/" + this.value,
                method: "get"
            })
                .done(
                    function (data) {
                        console.log(data);
                        $("#seating").empty();
                        $("#hidden").val("");
                        $("#m").children('option:not(:first)').remove();
                        $("#date").children('option:not(:first)').remove();
                        $("#time").children('option:not(:first)').remove();
                        var content = "";
                        $.each(data, function (key, movies) {
                            console.log(movies.movieID);

                            content += "<option value='" + movies.movieID._id + "'>" + movies.movieID.title + "</option>";
                        });
                        $("#m").append(content);
                    }
                )
                .fail(
                    function (err) {
                        console.log(err.responseText);
                    }
                )
        }

    });

    $(document).on('change', '#m', function () {
        if ($("#m").val().indexOf("select") >= 0) {
            $("#seating").empty();
            $("#date").children('option:not(:first)').remove();
            $("#time").children('option:not(:first)').remove();
        } else {
            $.ajax({
                url: "/showtimes/theatreID/movieID/" + $("#theatres").val() + "/" + this.value,
                method: "get"
            })
                .done(
                    function (data) {
                        $("#seating").empty();
                        $("#hidden").val("");

                        sessionStorage.setItem("title", data[0].movieID.title);

                        cart.movieID = data[0].movieID._id;
                        $("#date").children('option:not(:first)').remove();
                        $("#time").children('option:not(:first)').remove();

                        var date = "";

                        for (s in data[0].showtimes) {
                            var dateOld = new Date(data[0].showtimes[s].date);
                            var dateConvert = dateOld.toISOString().slice(0, 10);
                            date += "<option value='" + data[0].showtimes[s].date + "'>" + dateConvert + "</option>";
                        }
                        $("#date").append(date);
                    }
                )
                .fail(
                    function (err) {
                        console.log(err.responseText);
                    }
                )
        }

    });


    $(document).on('change', '#date', function () {
        if ($("#date").val().indexOf("select") >= 0) {
            $("#seating").empty();
            $("#time").children('option:not(:first)').remove();
        } else {
            $.ajax({
                url: "/showtimes/theatreID/movieID/" + $("#theatres").val() + "/" + $("#m").val(),
                method: "get"
            })
                .done(
                    function (data) {
                        var time = "";
                        $("#seating").empty();
                        $("#hidden").val("");
                        $("#time").children('option:not(:first)').remove();
                        for (s in data[0].showtimes) {
                            if (data[0].showtimes[s].date === $("#date").val()) {
                                //RETRIEVE THE SELECTED DATE FROM THE TABLE AND LOOP THROUGH THE TIME ARRAY
                                for (t in data[0].showtimes[s].time) {
                                    time += "<option value='" + data[0].showtimes[s].time[t] + "'>" + data[0].showtimes[s].time[t] + "</option>";
                                }
                            }
                        }
                        $("#hidden").val(data[0].hallID);
                        $("#time").append(time);
                    }
                )
                .fail(
                    function (err) {
                        console.log(err.responseText);
                    }
                )
        }

    });

    // $("#view").click(function () {
    //     $.ajax({
    //         url: "/halls/" + $("#hidden").val(),
    //         method: "get"
    //     })
    //         .done(
    //             function (data) {
    //                 $("#seating").empty();
    //                 var content = "";
    //                 for (h in data.seats) {
    //                     content += "<input type='checkbox' name=" + data.seats[h].name + " value=" + data.seats[h].name + ">" + data.seats[h].name;
    //                 }
    //                 $("#seating").append(content);
    //                 //$("#book").append("<input type='submit' value='Add to Cart' id='bookbtn'>");
    //             }

    //         )
    //         .fail(
    //             function (err) {
    //                 console.log(err.responseText);
    //             }
    //         )

    // });

    $("#book").click(function () {

        // if ($("#theatres").val("selecttheatre") || $("#m").val("selectmovie") || $("#date").val("selectdate") || $("#time").val("selecttime")) {
        //     window.location.href = "/";
        //     alert('Choose');
        // }
            cart.theatreID = $("#theatres").val();
            cart.hallID = $("#hidden").val();
            cart.date = $("#date").val();
            cart.time = $("#time").val();
            $.ajax({
                url: "/cart",
                method: "post",
                data: cart
            })
                .done(
                    function (data) {
                        location.href = '/booking/viewseats';
                    }
                )
                .fail(
                    function (err) {
                        console.log(err.responseText);
                    }
                )
        

    });

})