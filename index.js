var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(".btn").click(function (e) { 
    var userColor =$(this).attr("id");
    userPattern.push(userColor);
    $("#"+userColor).addClass("pressed");
    setTimeout(function () {
        $("#"+userColor).removeClass("pressed");
      }, 100);
    playAudio(userColor);
    checkAnswer(userPattern.length-1);
}); 

$(".play-btn").click(function (e) { 

    $(this).addClass("play-pressed");
    $("#level-title").text("Level " + 0);
    $(".play-btn").removeClass("play");
    if (!started) {
        setTimeout(function (){
            nextColor(); 
        },500);
        started = true;
    }

});

function nextColor(){
    var n = Math.floor(Math.random()*4);
    var randomColor = colors[n];
    level++;
    $("#level-title").text("Level " + level);
    gamePattern.push(randomColor);
    // $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+randomColor).addClass("pressed");
    setTimeout(function () {
        $("#"+randomColor).removeClass("pressed");
      }, 100);
    playAudio(randomColor);
    userPattern.splice(0, userPattern.length);
}

function playAudio(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userPattern[currentLevel]){
      console.log("success");
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
            nextColor();
        }, 1000);
      }
    } 

    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playAudio("wrong");
        $("#level-title").text("Game Over");
        $("#playbtn").text("PLAY AGAIN");
        $(".play-btn").removeClass("play-pressed");
        startover();
    }

}

function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}