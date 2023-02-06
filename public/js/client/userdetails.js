$(document).ready(function () {

    var user = {}
    var username="";
    var email="";

    $.ajax({
        url: "/user/details",
        method: "get"
    }).done(
        function (data) {
            $("#userid").val(data._id).trigger('change');;
            var dob = new Date(data.dob);
            $('#fullname').val(data.fullname);
            $('#username').val(data.username);
            $('#email').val(data.email);
            $('#mobile').val(data.mobileno);
            $('#dob').val(dob.toISOString().slice(0, 10));
            $('#points').val(data.points);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $("#userid").change(function () {
        $.ajax({
            url: "/booking/" + $(this).val(),
            method: "get"
        }).done(
            function (data) {
                console.log(data);
                $.each(data, function (key, booking) {
                    var content = "<tr>";
                    content += "<td>" + booking.movieID.title + "</td>";
                    content += "<td>" + booking.hallID.name + "</td>";
                    var date = new Date(booking.date);

                    content += "<td>" + date.toISOString().slice(0, 10) + "</td>";
                    content += "<td>" + booking.time + "</td>";
                    $("#summary").append(content);
                });
            }
        ).fail(
            function (err) {
                console.log(err.responseText);
            }
        );
    });

    $("#email").change(function(){
        email = $("#email").val();
        user.email = email
    });

    $("#username").change(function(){
        username = $("#username").val();
        user.username = username
      });

    $("#edit").click(function () {
        user.mobileno = $('#mobile').val();
        user.fullname = $("#fullname").val();
        $.ajax({
            url: "/user/editprofile",
            method: "post",
            data: user
        }).done(
            function (data) {
                alert("You will be logged out immediately to see the change");
                window.location.href = "/user/logout";

            }
        ).fail(
            function (err) {
                console.log(err);
                var errorsList = "<ul>";
                var errors = err.responseJSON;
                for (var i = 0; i < errors.length; i++) {
                    errorsList += '<li> x  ' + errors[i].msg + '</li>';
                }
                errorsList += "</ul>";

                $(".errordiv").show();
                $(".errorspan").append(errorsList);
            }
        );
    });

    $("#userid").change(function () {
        $.ajax({
            url: "/booking/" + $(this).val(),
            method: "get"
        }).done(
            function (data) {
                console.log(data);
                $.each(data, function (key, booking) {
                    var content = "<tr>";
                    content += "<td>" + booking.movieID.title + "</td>";
                    content += "<td>" + booking.hallID.name + "</td>";
                    var date = new Date(booking.date);

                    content += "<td>" + date.toISOString().slice(0, 10) + "</td>";
                    content += "<td>" + booking.time + "</td>";
                    $("#summary").append(content);
                });
            }
        ).fail(
            function (err) {
                console.log(err.responseText);
            }
        );
    });


});