$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('id');
    var genre_ids = [];

    $.ajax({
        url: "/movies/details/" + movieId, /// CALLS THE ROUTES TO RETURN THE REQUIRED EVENT BASED ON eventid
        method: "get"
    }).done(
        function (data) {
            var release_date = new Date(data.release_date);
            $(".preview").append("<img id='previewimg' src='../uploads/" + data.poster_path.filename + "' width='10%' height='auto'/>")
            $('#title').val(data.title);
            $('#overview').val(data.overview);
            $("#runtime").val(data.runtime);
            $('#releasedate').val(release_date.toISOString().slice(0, 10));

            $("#id").val(data._id);
            $('#popularity').val(data.popularity);
            $('#vote_count').val(data.vote_count);
            $('#original_language').val(data.original_language);
            $('#vote_average').val(data.vote_average);

            for (g in data.genre_ids) {
                genre_ids.push(data.genre_ids[g]);
            }
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );
    
    $.ajax({
        url: "/genres",
        method: "get",
    })
        .done(function (data) {
            var content = "";
            $.each(data, function (key, value) {

                var b = false;
                for (g in genre_ids) {
                    if (value._id === genre_ids[g]) {
                        content += "<input type='checkbox' name='genres' value='" + value._id + "'checked>" + value.name + "<br>";
                        var b = true;
                        break;
                    }
                }
                if (!b) {
                    content += "<input type='checkbox' name='genres' value='" + value._id + "'>" + value.name + "<br>";
                }

            });
            $(".genre").append(content);
        })
        .fail(
            function (err) {
                console.log(err.responseText);
            });

            
//PREVIEW THE PICTURE BEFORE UPLOAD
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      //reader.onload property an event handler executed when the load event is fired, 
      //when content read with readAsDataURL is available.
      reader.onload = function(e) {
          //e is the event, target -> element that trigger the event, result 
        $('#previewimg').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); //read the content of the specified file
    }
  }
  
  $("#file").change(function() {
    readURL(this);
  });
});