$(document).ready(function () {
    $("#login").click(function () {
        $.ajax({
            url: "/user/login",
            method: "post",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            }
        })
            .done(
                function (data) {
                    location.href = "/";
                    alert('Your Submission was successful');
                })
            .fail(
                function (err) {
                    $(".errordiv").empty();
                    $(".errordiv").hide();
                    console.log(err);
                    var errors = "";
                    var errorsList = "";

                    if(err.responseText == "Unable to login") {
                        errors = err.responseText;
                        $(".errorspan").append(errors);
                    }

                    if (err.responseJSON) {
                        errorsList = "<ul>";
                        var errors = err.responseJSON;
                        for (var i = 0; i < errors.length; i++) {
                            errorsList += '<li> x  ' + errors[i].msg + '</li>';
                        }
                        errorsList += "</ul>";
                        $(".errorspan").append(errorsList);
                    }
                    $(".errordiv").show();

                }
            )


    })
});