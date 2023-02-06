$(document).ready(function () {
    $("#statusmessage").empty();
    var cart = {};
    $.ajax({
        url: "/cart",
        method: "get"
    })
        .done(
            function (data) {
                if (data === null) {
                    console.log(data);
                    $("body").empty();
                    $("body").append("<p>There is no order in the cart</p>")
                } else {
                    var content = "";
                    var seats = [];
                    content += "<h3>Cart</h3>";

                    cart.theatreID = data.theatreID;
                    cart.movieID = data.movieID;
                    cart.ticketID = data.ticketID;
                    cart.hallID = data.hallID;
                    var date = new Date(data.date);
                    content += sessionStorage.getItem("title") + "<br>";


                    $("#hidden").val(data.totalprice).trigger('change');
                    cart.totalprice = data.totalprice;
                    cart.seatsBooked = data.seatsBooked;
                    cart.date = data.date;
                    cart.time = data.time;



                    for (s in data.seatsBooked) {
                        seats.push(data.seatsBooked[s]);
                    }
                    content += seats + "<br>";
                    content += date.toISOString().slice(0, 10) + "<br>";
                    content += data.time + "<br>";
                    $("#details").append(content);
                    $("#amount").append("Amount Required to Pay $" + data.totalprice + "<br>");
                }

            })
        .fail(
            function (err) {
                $("body").append(err);
            }
        )

    $(".discount").click(function () {
        var points = 0;
        var discount = 0;
        $("#hiddenDiscount").val($(this).val()).trigger('change');
        switch ($(this).val()) {
            case "5":
                points = 10;
                discount = 5;
                $("#ten").attr("disabled", true);
                $("#twenty").attr("disabled", true);
                break;
            case "10":
                points = 15;
                discount = 10;
                $("#five").attr("disabled", true);
                $("#twenty").attr("disabled", true);
                break;
            case "20":
                points = 20;
                discount = 20;
                $("#five").attr("disabled", true);
                $("#ten").attr("disabled", true);
                break;
        }

        $.ajax({
            url: "/user/points",
            method: "get"
        })
            .done(
                function (data) {
                    console.log(data);
                    cart.userID = data._id;
                    var remainder = data.points - points;
                    if (remainder < 0) {
                        $("#five").attr("disabled", false);
                        $("#ten").attr("disabled", false);
                        $("#twenty").attr("disabled", false);

                        alert("You do not have enough points");
                    } else {
                        $("#reset").show(); //DISPLAY THE RESET DISCOUNT BUTTON AFTER ONE OF IT IS CLICKED
                        $("#amount").empty();
                        var content = "<hr>";
                        content += "<b>Amount Before Discount:</b> $" + $("#hidden").val() + "<br>";
                        content += "<b>Discount:</b> $" + discount + "<br>";
                        var remainder = $("#hidden").val() - discount;
                        if (remainder < 0) {
                            remainder = 0;
                        }
                        content += "<b>Amount After Discount:</b> $" + remainder + "<br>";

                        // var content = "";
                        // content += "Amount Required to Pay $" + $("#hidden").val() + "<br>";
                        // content += "Discount $" + discount + "<br>";
                        // var remainder = $("#hidden").val() - discount;
                        // if(remainder < 0) {
                        //     remainder = 0;
                        // }
                        // content += "Amount Required to Pay $" + remainder + "<br>";

                        cart.totalprice = remainder;
                        $("#amount").append(content);

                    }

                })
            .fail(
                function (err) {
                    $("#statusmessage").append(err.responseText);
                })


    })


    $("#modify").click(function () {
        cart.totalprice = null;
        cart.seatsBooked = null;
        cart.ticketID = null;
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


    $("#reset").click(function () {
        //DISPLAY THE 3 DISCOUNT OPTIONS
        $("#five").attr("disabled", false);
        $("#ten").attr("disabled", false);
        $("#twenty").attr("disabled", false);
        $("#reset").hide();
        $("#amount").empty(); //CLEAR THE AMOUNT REQUIRED TO PAY AND AFTER DISCOUNT 
        var totalamt = parseInt(cart.totalprice) + parseInt($("#hiddenDiscount").val());
        $("#amount").append("Amount Required to Pay $" + totalamt + "<br>");
    })

    $("#cancel").click(function () {
        $.ajax({
            url: "/cart/remove",
            method: "post"
        })
            .done(
                function (data) {
                    window.location.href = "/";

                })
            .fail(
                function (err) {
                    $("#statusmessage").append(err.responseText);
                })
    })



    $("#submit").click(function () {
        console.log(cart);
        $.ajax({
            url: "/cart",
            method: "post",
            data: cart
        })
            .done(
                function (data) {
                    console.log(data);
                    addbooking();
                })
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )
    })

});



function addbooking() {
    $.ajax({
        url: "/booking/addBooking",
        method: "post",
    })
        .done(
            function (data) {
                location.href = "/booking/summary/user";
            })
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
}
