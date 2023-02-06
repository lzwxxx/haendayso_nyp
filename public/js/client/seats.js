$(document).ready(function () {

    $("#next").hide();
    $("#seating").hide();

    var cart = {};

    var count = 0;

    var seatsBooked = [];

    var seats = [];
    $.ajax({
        url: "/cart",
        method: "get"
    })
        .done(
            function (data) {
                var content = "";
                var date = new Date(data.date);
                content += sessionStorage.getItem("title") + "<br>";
                content += "<div id='data'>" + date.toISOString().slice(0, 10) + "</div><br>";

                $("#hallID").val(data.hallID).trigger('change');



                cart.theatreID = data.theatreID;
                $("#theatreID").val(cart.theatreID);

                cart.movieID = data.movieID;
                $("#movieID").val(cart.movieID).trigger('change');

                cart.hallID = data.hallID;
                cart.date = data.date;
                $("#date").val(cart.date);

                cart.time = data.time;
                $("#time").val(cart.time);

                $(".ids").trigger('change');


                content += "<div id='time'>" + data.time + "</div><br>";
                $("#cart").append(content);
            })
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
    $("#movieID").change(function () {
        $.ajax({
            url: "/movies/details/" + $("#movieID").val(),
            method: "get"
        })
            .done(
                function (data) {
                    $("#movieposter").empty();
                    var content = "";
                    content += "<img src='../uploads/" + data.poster_path.filename + "' width='250' height='350'/>";
                    // content += "<p>" + data.title + "</p>"
                    $("#movieposter").append(content);
                })
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )
    })




    $(".ids").change(function () {
        $.ajax({
            url: "/booking",
            method: "get",
            data: {
                movieID: $("#movieID").val(),
                date: $("#date").val(),
                time: $("#time").val()
            }
        })
            .done(
                function (data) {
                    $.each(data, function (key, movie) {
                        for (s in movie.seatsBooked) {
                            seatsBooked.push(movie.seatsBooked[s]);
                        }
                     });
                     console.log(seatsBooked.length);
                }

            )
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )
    });

    $("#hallID").change(function () {
        $.ajax({
            url: "/halls/" + $("#hallID").val(),
            method: "get"
        })
            .done(
                function (data) {
                    $("#seating").empty();
                    var content = "";
                    content += "<h1>Select Seats</h1>"

                    for (h in data.seats) {
                        var b = false;
                        if (seatsBooked.length > 0) {
                            for (s in seatsBooked) {                               
                                if (data.seats[h].name == seatsBooked[s]) {
                                    
                                    content += "<input type='checkbox' name=" + data.seats[h].name + " value=" + data.seats[h].name + " disabled>" + data.seats[h].name;
                                    var b = true;
                                    break;
                                }
                            }
                        }
                        if (!b) {
                            content += "<input type='checkbox'  name=" + data.seats[h].name + " value=" + data.seats[h].name + ">" + data.seats[h].name;
                        }

                    }
                    $("#seating").append(content);
                }

            )
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )
    })


    $.ajax({
        url: "/tickets",
        method: "get"
    })
        .done(
            function (data) {
                var content = "";
                $.each(data, function (key, tickets) {
                    content += "<option value='" + tickets._id + "'>" + tickets.type + " - $" + tickets.price + "</option>";
                });
                $("#tickettype").append(content);
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $(document).on('change', '#tickettype', function () {
        if ($("#tickettype").val().indexOf("select") >= 0) {
            $("#seating").hide();
            $("#next").hide();
            count = 0;

        } else {

            $("#seating").show();
            $.ajax({
                url: "/tickets/" + $("#tickettype").val(),
                method: "get"
            })
                .done(
                    function (data) {
                        count = 0;
                        $("input[type=checkbox]").prop("checked", false);
                        $("#ticket").empty();
                        $("#type").val(data.type).trigger('change');
                        $("#price").val(data.price);

                    }
                )
                .fail(
                    function (err) {
                        console.log(err.responseText);
                    }
                )
        }
    });

    $(document).on('change', 'input[type=checkbox]', function () {
        if ($(this).is(':checked')) {
            seats.push($(this).val());
            count++;
        }

        for (s in seats) {
            if ($("input[name=" + seats[s] + "]").is(':checked') == false) {
                seats.splice(s, 1);
                count = count - 1;
            }
        }

        if (count >= 1) {

            $("#ticket").empty();
            var content = "";
            content += "<b>Ticket Type:</b> " + $("#type").val() + " x" + count + "<br>";
            var totalprice = count * $("#price").val();
            content += "<b><p id='subtotal'>Subtotal Price:</b>  $" + totalprice + "</p>";

            cart.totalprice = totalprice;

            $("#ticket").append(content);
            $("#next").show();

        } else {

            $("#ticket").empty();
            $("#next").hide();
        }
    })

    $("#next").click(function () {

        cart.ticketID = $("#tickettype").val();
        cart.seatsBooked = seats;

        $.ajax({
            url: "/cart",
            method: "post",
            data: cart
        })
            .done(
                function (data) {
                    location.href = '/booking/payment';
                }

            )
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )

    });

})