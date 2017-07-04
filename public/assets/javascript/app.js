var currentURL = window.location.origin;

$(document).on("click", ".comments", function() {
  // empties the notes from the note section
  $("#notes").empty();
  // saves the article id
  var thisId = $(this).attr("data-id");

  // makes an ajax call for the article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // adds the note information to the page
    .done(function(data) {
      console.log(data);
      $("#notes").append("<h5>" + data.title + "</h5>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      if (data.comments) {
        $("#titleinput").val(data.comments.title);
        $("#bodyinput").val(data.comments.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  // grabs the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // runs a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // captures  from title input
      title: $("#titleinput").val(),
      // takes values from note textarea
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      // logs the response
      console.log(data);
      // empties the notes section
      $("#notes").empty();
    });
});

$(document).on("click", ".deleteArticle", function() {
    var articleId = $(this).attr("data-id");
    var articleToDelete = $(this).parent().parent().parent();
    console.log(articleToDelete);
    $.post({
      url: currentURL + "/delete",
      data: { 
        articleId: articleId
      }
      
    }).done(function(data) {
      console.log(data);
      articleToDelete.remove();

    }).fail(function(error) { 
      console.log(error);
    })
});

$(document).on("click", ".undeleteArticle", function() {
    var articleId = $(this).attr("data-id");
    var articleToDelete = $(this).parent().parent().parent();
    console.log(articleToDelete);
    $.post({
      url: currentURL + "/undelete",
      data: { 
        articleId: articleId
      }
      
    }).done(function(data) {
      console.log(data);
      articleToDelete.remove();

    }).fail(function(error) { 
      console.log(error);
    })
});


// $(document).on("click", ".deleteArticle", function() {
//     var articleId = $(this).attr("data-id");
//     var articleToDelete = $(this).parent().parent().parent();
//     console.log("********* ARTICLE TO DELETE ***********");
//     console.log(articleToDelete);
//     $.post({
//       url: currentURL + "/delete",
//       data: { 
//         articleId: articleId
//       }
      
//     }).done(function(data) {
//       console.log("************ BACK FROM POST /DELETE IN PUBLIC JS");
//       // console.log(data);
//       // Remove note from savedNotesDiv
//       articleToDelete.remove();

//     }).fail(function(error) { 
//       console.log("**********ARTICLE COULD NOT BE DELETED.**********");
//       console.log(error);
//     })
// });

