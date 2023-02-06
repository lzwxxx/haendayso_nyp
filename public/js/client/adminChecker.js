$(document).ready(function () {
    
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id');
    $.ajax({
        url: "/user/admin",
        method: "get"
    })
        .done(
            function (data) {
                if(data.role === "Admin") {
                    console.log("ADMIN");
                    $("#loginnav").hide();
                    $("#registernav").hide();
                    var content = "";
                    content += "";
                    content += "<li id><a href='/user/accountprofile'>View Account Profile</a></li>"
                    content += "<li><a href='/booking/payment'>Cart</a></li>"
                    content += "<li><a href='/admin/addmovie'>Add Movie</a></li>";
                    content += "<li><a href='/user/logout'>Logout</a></li>"
                    $("#navbar").append(content);
                    $("#updatethismovie").append("<a href='/admin/updatemovie?id=" + movieId + "'><button id='update'>Update Movie</button></a>");
                } else {
                    console.log("USER");
                    var content = "";
                    $("#loginnav").hide();
                    $("#registernav").hide();
                    content += "<li><a href='/user/accountprofile'>View Account Profile</a></li>"
                    content += "<li><a href='/booking/payment'>Cart</a></li>"
                    content += "<li><a href='/booking/checkbooking/user'>Check Booking</a></li>"
                    
                    content += "<li><a href='/user/logout'>Logout</a></li>"
                    
                    $("#navbar").append(content);                
                }
            })
        .fail(
            function (err) {

                console.log(err);
            }
        )
});