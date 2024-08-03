var buttonColours =["red","blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameIsStarted=false;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

if($(document).keypress(function(event){
    if(gameIsStarted===false){
        $("level-title").text("Level"+level);
        nextSequence();
        gameIsStarted=true;
    }

    
}));


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("sounds/" + randomChosenColour + ".mp3");
    playSound(randomChosenColour);
    checkAnswer(userClickedPattern.length-1);

    
}
function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    gameIsStarted=false;
}