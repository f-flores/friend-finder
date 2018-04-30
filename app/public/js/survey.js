//------------------------------------------------------------------------------------------
//
// survey.js
//
$(document).ready(function() {
  // -----------------------------------------------------------------------------------------
  // clearInputFields()
  //
  function clearInputFields() {
    $(".form-control").each(function() {
      $(this).val("");
    });
    $(".opt-selected").each(function() {
      $(this).val("placeholder");
    });
  }

  // regular expression validators
  function validateName(name) {
    var re = /^[a-zA-Z ]{1,}$/;
    return re.test(name);
  }

  function validateImgUrl(purl) {
    var re = /(http(s?):)(\/\/)([\/|.|\w|\s|-])*\.(?:jpg|gif|png|bmp|svg|jpeg)/i;
    return re.test(purl);
  }

  $("#submit-btn").on("click", function(event) {
    var userInfo = {};

    event.preventDefault();

    // validate form
    function formValidated() {
      var isValid = true;

      $(".name-control").each(function() {
        if (validateName($(this).val()) === false) {
          $("#friendNameError").html("<p class=\"error-msg\">Invalid name must be at least 3 alpha characters long.</p>");
          isValid = false;
        } else {
          $("#friendNameError").html("");
        }
      });

      $(".imgurl-control").each(function() {        
        if (validateImgUrl($(this).val()) === false) {
          $("#photoUrlError").html("<p class=\"error-msg\">Please enter valid image url in the form of http://www.domain.com/image.jpg</p>");
          isValid = false;
        } else {
          $("#photoUrlError").html("");
        }
      });

      $(".opt-selected").each(function(index, element) {
        if ($(this).val() === null) {
          $("#select-error-" + (index+1).toString()).html("<p class=\"error-msg\">Please select valid option 1 - 5.</p>");
          isValid = false;
        }
      });

      return isValid;
    }

    if (formValidated()) {
      userInfo = {
        "name": $("#friendName").val(),
        "photo": $("#friendPhoto").val(),
        "scores": [ $("#qtn1").val(), $("#qtn2").val(),
                    $("#qtn3").val(), $("#qtn4").val(),
                    $("#qtn5").val(), $("#qtn6").val(),
                    $("#qtn7").val(), $("#qtn8").val(),
                    $("#qtn9").val(), $("#qtn10").val()]
      };
    
      // post data to api
      $.post("/api/friends", userInfo, function(data) {
        // place best match users info in modal
        bimg = $("<img>");
        console.log("Best Match: " + JSON.stringify(data));
        $("#bmatch-name").html(data.name);
        bimg.attr("src", data.photo).
            attr("alt", data.photo).
            addClass("img-fluid");
        $("#bmatch-pic").replaceWith(bimg);
        $("#best-match").modal("toggle");
        clearInputFields();
      });
    }
  });
})