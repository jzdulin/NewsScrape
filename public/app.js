// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display all article informationinformation on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("Name: <input id='titleinput' name='title'>");
        // A textarea to add a new note body
        $("#notes").append("Comment: <textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Create a comment section and append the name and comment along with a delete button
          $("#notes").append("<h4> Comments on this article: </h4>") 
          $("#notes").append("<h4>" + data.note.title + "</h4>") 
          $("#notes").append("<h4>" + data.note.body + "</h4>" )
          $("#notes").append("<button data-id='" + data._id +"id='delete'>Delete Comment</button>") 
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  //when you click the delete comment button
  $(document).on("click", "#delete", function() {
    var thisId = $(this).attr("data-id");
    
    //ajax delete method to remove a comment
    $.ajax({
      method: "DELETE",
      url: "/notes/" + thisId,
      success: function(data) {
        return
      }

  })
})