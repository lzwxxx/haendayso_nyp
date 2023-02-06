$(document).ready(function () {

    $('#username').blur(function () {
        var input = $(this);
        var re = "^[a-zA-Z]{8,12}$";
        if (input.val().match(re) && input.val() !== "") {
            $("#usernameerror").hide();
            input.removeClass("invalid").addClass("valid");
        } else {
            $("#usernameerror").show();
            $("#usernameerror").css('color', 'red');
            $("#usernameerror").css('font-size', '13px');
            input.removeClass("valid").addClass("invalid"); 
        }
    });

    $('#mobile').blur(function () {
        var input = $(this);
        var re = "^[89]\\d{7}$";
        if (input.val().match(re) && input.val() !== "") {
            $("#mobilerror").hide();
            input.removeClass("invalid").addClass("valid");
        } else {
            $("#mobilerror").show();
            $("#mobilerror").css('color', 'red');
            $("#mobilerror").css('font-size', '13px');
            input.removeClass("valid").addClass("invalid"); 
        }
    });

    $('#cpassword').blur(function () {
        var input = $(this);
        console.log(input);
        if ($('#cpassword').val() === $('#password').val() && input.val() !== "") {
            $("#cperror").hide();
            input.removeClass("invalid").addClass("valid");
        } else {
            $("#cperror").show();
            $("#cperror").css('color', 'red');
            $("#cperror").css('font-size', '13px');
            input.removeClass("valid").addClass("invalid"); 
        }
    });

    // $('#password').blur(function () {
    //     var input = $(this);
    //     if ($('#cpassword').val() === $('#password').val() && input.val() !== "") {
    //         $("#cperror").hide();
    //         input.removeClass("invalid").addClass("valid");
    //     } else {
    //         $("#cperror").show();
    //         $("#cperror").css('color', 'red');
    //         $("#cperror").css('font-size', '13px');
    //         input.removeClass("valid").addClass("invalid"); 
    //     }
    // });

    $('#email').blur(function () {
        var input = $(this);
        var re = '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,3})?$';
        if (input.val().match(re) && input.val() !== "") {
            $("#emailerror").hide();
            input.removeClass("invalid").addClass("valid");
        } else {
            $("#emailerror").show();
            $("#emailerror").css('color', 'red');
            $("#emailerror").css('font-size', '13px');
            input.removeClass("valid").addClass("invalid");
        }
    });

    $(".inputs").blur(function () {
        var input = $(this);
        if (input.val() === "") {
            input.removeClass("valid").addClass("invalid");
        } else {
            input.removeClass("invalid").addClass("valid");
        }
    });


});
