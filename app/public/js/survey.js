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
    $("#picture-error").empty();
  }


  // -------------------------------------------------------------------------------------------------
  // change color of select menu option to black if question is answered
  $(".opt-selected").each(function(){

    $(this).change(function(){
      var current = $(this).val();
      console.log("in opt-selected: " + current);

      if (current !== "placeholder") {
        $(this).css("color","black");
        $(this).css("font-weight","bold");
        $(this).css("border","2px solid #3B5998");
      } else {
        $(this).css("color","gray");
      }
    });
  });

  // --------------------------------------------------------------------------------------------------------
  // regular expression validators
  //
  function validateName(name) {
    var re = /^[a-zA-Z ]{1,}$/;
    return re.test(name);
  }

  function validateImgUrl(purl) {
    var re = /((http(s)?(\:\/\/))+(www\.)?([\w\-\.\/])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:\?\!\@\^\$ -]/i;
    return re.test(purl);
  }

  // validation routines
  function checkNameInput() {
    var isValid = true;

    $(".name-control").each(function() {
      if (validateName($(this).val()) === false) {
        $("#friendNameError").html("<p class=\"error-msg\">Invalid name must be at least 3 alpha characters long.</p>");
        isValid = false;
      } else {
        $("#friendNameError").html("");
      }
    });

    return isValid;
  }

  function checkPhotoUrl() {
    var isValid = true;

    $(".imgurl-control").each(function() {        
      if (validateImgUrl($(this).val()) === false) {
        $("#photoUrlError").html("<p class=\"error-msg\">Please enter valid image url, something like http://www.domain.com/image.jpg</p>");
        isValid = false;
      } else {
        $("#photoUrlError").html("");
      }
    });

    return isValid;
  }

  function checkSurveyAnswers() {
    var isValid = true;

    $(".opt-selected").each(function(index) {
      var surveyIndex = index + 1, selString;

      selString = "#select-error-" + surveyIndex;
      if ($(this).val() === null) {
        $(selString).html("<p class=\"error-msg\">Please select valid option 1 - 5.</p>");
        isValid = false;
      } else {
        $(selString).html("");
      }
    });

    return isValid;
  }

  $("#submit-btn").on("click", function(event) {
    var userInfo = {};

    event.preventDefault();

    // validate form
    function formValidated() {
      var isValidName = checkNameInput(),
          isValidImgUrl = checkPhotoUrl(),
          isValidSurvey = checkSurveyAnswers();

      console.log("isValid: " + (isValidName && isValidImgUrl && isValidSurvey));
      return isValidName && isValidImgUrl && isValidSurvey;
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
        var bimg = $("<img>");
        $("#bmatch-name").html(data.name);
        bimg.attr("src", data.photo).
            attr("alt", data.photo).
            addClass("img-fluid");
        bimg.error(function(){
              this.onerror = null;
              this.src = "https://via.placeholder.com/300x250.png";
              $("#picture-error").html("<p class=\"picture-error\">Sorry, image for user does not exist.</p>");
        });

        $("#bmatch-pic").append(bimg);
        $("#best-match").modal("toggle");
      });
    }

    $("#best-match").on("hidden.bs.modal", function () {
      // on hidden modal execute following
      $("#bmatch-pic").empty();
      $("#bmatch-name").empty();
      clearInputFields();
    });
  });
})