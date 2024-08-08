var gamePattern = [];

var buttonColor = ["red","blue","green","yellow"];

var userClickedPattern = [];

var level = 1;

var started = false;

$("body").keypress(function(){
  if(started === false ){  
    nextSequence();
    started = true;
    $("body").removeClass("game-over");
  }
  })
  
          // CHECKING PART

 function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
 }

 function animatePress(currentColor){
  $("." + currentColor ).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor ).removeClass("pressed");
  }, 100);
}

function nextSequence(){

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor); 
  $("#"+ randomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(20);
  playSound(randomChosenColor);
  $("#level-title").text("level "+ level);
  level++;
}


$(".btn").click(function () { 
  var userChosenColor = event.srcElement.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  if(started === true){
    repeat(userClickedPattern.length-1);
  }
})


function repeat(currentLevel){

  if( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function() {nextSequence();},800);
    }
    }else{
          startOver();
        }
   }

function startOver(){
  level = 1;
  $("#level-title").html("<h6><center>WRONG</center> Press any button to restart</h6>");
  started = false;
  $("body").addClass("game-over");


  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  userClickedPattern = [];
  gamePattern = [];

    
}
