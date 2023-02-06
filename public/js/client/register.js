$(document).ready(function () {
    $("#submit").click(function () {
        console.log("submit");
        $.ajax({
            url: "/user/register",
            method: "post",
            data: {
                fullname: $("#fullname").val(),
                username: $("#username").val(),
                email: $("#email").val(),
                mobileno: $("#mobile").val(),
                gender: $("#gender").val(),
                dob: $("#dob").val(),
                password: $("#password").val(),
                cpassword: $("#cpassword").val()
            }
        })
            .done(
                function (data) {
                    location.href="/";
                })
            .fail(
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
            )


    })
});