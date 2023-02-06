$(document).ready(function () {
    var cart = {};
    $.ajax({
        url: "/booking/latest/booking",
        method: "get"
    })
        .done(
            function (data) {
                console.log(data);
                
                var content = "";
                content+="<table>";
                content+="<tr><th>Username</th><th>Movie Title</th><th>Theatre</th><th>Ticket Type</th><th>Seats Booked</th><th>Date</th><th>Time</th><th>Total Price</th></tr>";
                content+="<tr>";
                content+="<td>"+ data.userID.username +"</td>";
                content+="<td>" + data.movieID.title + "</td>";
                content+="<td>"+ data.theatreID.name +"</td>";
                content+="<td>"+ data.ticketID.type +"</td>";
                content+="<td>"+ data.seatsBooked +"</td>";
                

                var date = new Date(data.date);
                content+="<td>"+ date.toISOString().slice(0, 10) +"</td>"
                content+="<td>"+ data.time +"</td>"
                content+="<td>$" + data.totalprice + "</td>"
                content+="<tr></table>";

                $("#summary").append(content);

                for (s in data.seatsBooked) {
                    seats.push(data.seatsBooked[s]);
                }
                // content += seats + "<br>";
                // content += date.toISOString().slice(0, 10) + "<br>";
                // content += data.time + "<br>";
                // $("#details").append(content);
                // $("#amount").append("$" + data.totalprice + "<br>");
            })
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

        $.ajax({
            url: "/booking/check/booking",
            method: "get"
        })
            .done(
                function (data) {
                    
                    var content = "";
                    content+="<table>";
                    content+="<tr><th>Username</th><th>Movie Title</th><th>Theatre</th><th>Ticket Type</th><th>Seats Booked</th><th>Date</th><th>Time</th><th>Total Price</th></tr>";
                    
                    $.each(data, function (key, booking) {
                        content+="<tr>";
                        content+="<td>"+ booking.userID.username +"</td>";
                        content+="<td>" + booking.movieID.title + "</td>";
                        content+="<td>"+ booking.theatreID.name +"</td>";
                        content+="<td>"+ booking.ticketID.type +"</td>";
                        content+="<td>"+ booking.seatsBooked +"</td>";
                        
        
                        var date = new Date(booking.date);
                        content+="<td>"+ date.toISOString().slice(0, 10) +"</td>"
                        content+="<td>"+ booking.time +"</td>"
                        content+="<td>$" + booking.totalprice + "</td>"
                        
                        
                    
                    });
                    content+="<tr></table>";
                    $("#checkbooking").append(content);
                    
                })
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )

    
});

