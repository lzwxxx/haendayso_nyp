$(document).ready(function () {

    $("#showthetimes").hide();
    $("#readd").hide();
    $("#sendshowtime").hide();
    $("#showdate").hide();
    var showtimes = {
        showtimes: [
        ]
    };
    $.ajax({
        url: "/admin/movies/newlyadded",
        method: "get"
    })
        .done(
            function (data) {
                console.log(data);
                $("#m").append("<input type='text' value=' "+ data[0].title+" ' readonly>");
                $("#hiddenmovieid").val(data[0]._id).trigger('change');
                
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $.ajax({
        url: "/halls",
        method: "get"
    })
        .done(
            function (data) {
                var content = "";
                $.each(data, function (key, halls) {
                    content += "<option value='" + halls._id + "'>" + halls.name + "</option>";
                });
                content += "</select>";
                $("#hall").append(content);
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


    $("#Lockvenue").click(function(){
        $("#theatres").attr("disabled",true);
        $("#hall").attr("disabled",true);
        $("#showdate").show();
    });  


    $("#addDate").click(function () {
        $("#showthetimes").show();
        $("#newdate").append($("#date").val());
        $("#date").attr("disabled", true);
        $("#addDate").attr("disabled", true);
    });

    $("#addTime").click(function () {
        $("#newul").prepend("<li value='" + $("#time").val() + "'>" + $("#time").val() + "</li>");
        $("#readd").show();
        $("#sendshowtime").show();
    });

    $("#readd").click(function(){
        $("#date").attr("disabled", false);
        var time = [

        ];

        $("#newul li").each(function (i) {
            console.log($(this).attr('value')); // This is your rel value
            time.push($(this).attr('value'));
        });
        showtimes.showtimes.push({
            date: $("#date").val(),
            time: time
        })  

        $("#addedShowtimes").append("<td>" + $("#date").val() + "</td>");
        for(v in time) {
            $("#addedShowtimes").append("<td>" + time  + "</td>");
        }

        $("#newdate").empty();
        $("#newul").empty();
        $("#readd").hide();
        $("#showthetimes").hide();
        $("#sendshowtime").hide();
        $("#date").attr("disabled", false);
        $("#addDate").attr("disabled", false);
    })

    $("#sendshowtime").click(function () {
        var time = [

        ];

        $("#newul li").each(function (i) {
            console.log($(this).attr('value')); // This is your rel value
            time.push($(this).attr('value'));
        });
        showtimes.showtimes.push({
            date: $("#date").val(),
            time: time
        })  
        showtimes.movieID = $("#hiddenmovieid").val();
        showtimes.theatreID = $("#theatres").val();
        showtimes.hallID = $("#hall").val();
        
        $.ajax({
            url: "/showtimes/addshowtime/date/time",
            method: "post",
            data: showtimes
        })
            .done(
                function (data) {
                    window.location.href = "/";
                }
            )
            .fail(
                function (err) {
                    console.log(err.responseText);
                }
            )

    })
})