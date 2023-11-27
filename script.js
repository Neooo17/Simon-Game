var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4); 
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}  


$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id")
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(() => {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
    
})

function checkAnswer(lastItemInUserClickedPattern) {
  if (userClickedPattern[lastItemInUserClickedPattern] === gamePattern[lastItemInUserClickedPattern]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
        nextSequence();
    }, 1000);
  }
  }
  
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}