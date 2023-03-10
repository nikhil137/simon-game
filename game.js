var gamePattern = [] ;
var buttonColours = ["red","blue","green","yellow"] ;
var userClickedPattern = [] ;
var notStarted = true ;
var level = 0 ;
$(document).keypress(function(){
  if(notStarted){
  $("#level-title").text("Level 0") ;
    nextSequence() ;
    notStarted = false ;
  }
}) ;
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id") ;
  userClickedPattern.push(userChosenColour) ;
  playSound(userChosenColour) ;
  animatePress(userChosenColour) ;
  checkAnswer(userClickedPattern.length-1) ;
});
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level) ;
  var randomNumber = Math.floor(Math.random()*4) ;
  var randomChosenColour = buttonColours[randomNumber] ;
  gamePattern.push(randomChosenColour) ;
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour) ;
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over") ;
    setTimeout(function(){
      $("body").removeClass("game-over") ;
    },200) ;
    $("#level-title").text("Game Over, Press Any Key to Restart") ;
    startOver() ;
  }
}
function startOver(){
  level = 0 ;
  gamePattern = [] ;
  notStarted = true ;
}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3") ;
  audio.play() ;
}
function animatePress(currentColor){
    $( "#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
