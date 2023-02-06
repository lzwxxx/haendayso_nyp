$(document).ready(function () {
    $.ajax({
        url: "/genres",
        method: "get",
})
.done(function (data) {
    $.each(data, function(key, value){
        $(".genre").append("<input type='checkbox' name='genres' value='" + value._id + "'>" + value.name + "<br>"); //follow MongoDB
    }); 
})
.fail(
    function (err) {
        console.log(err.responseText);
    });
});


//PREVIEW THE PICTURE BEFORE UPLOAD
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      //reader.onload property an event handler executed when the load event is fired, 
      //when content read with readAsDataURL is available.
      reader.onload = function(e) {
          //e is the event, target -> element that trigger the event, result 
        $('#img').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); //read the content of the specified file
    }
  }
  
  $("#file").change(function() {
    readURL(this);
  });

  