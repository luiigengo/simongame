var level = 0

var userClickedPattern = []

var gamePattern = []

var started = false

var buttonColours = ["red", "blue", "green", "yellow"]


$("body").on("keypress", function() {
if (!started)
  nextSequence();
  started = true
})



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");


  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)
})




function nextSequence() {

  level++

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#level-title").text("level " + level);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  userClickedPattern = []
}






function playSound(name) {


  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();

}



function animatePress(currentColour) {
  var actButton = $("." + currentColour)
  actButton.addClass("pressed")

  setTimeout(function() {
    actButton.removeClass("pressed")
  }, 100)

}


function checkAnswer(lastColour) {

  if (userClickedPattern[lastColour] === gamePattern[lastColour]) {
    // console.log("success")

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    } else {

    }
  }
  else {
    playSound("wrong")

    var wrongClass = $("body")

    wrongClass.addClass("pressed");

    setTimeout (function() {
    wrongClass.removeClass("pressed")
  }, 200);

   $("#level-title").text("Game over, press any key to restart");

   startOver()
  }
}

function startOver() {
  level = 0
  gamePattern=[]
  started = false;
}
