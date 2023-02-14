
var gamePattern = [];

var userCLickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level = 0;

var started =false;


$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level "+level);

        nextSequence();     

        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id"); 

    userClickedPattern.push(userChosenColor);

    
    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]  === userClickedPattern[currentlevel]){
        

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");

        $("#level-title").text("game over! press any key to restart.");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level = level +1;

    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    var aud = new Audio("sounds/"+name+".mp3");
    aud.play();
}

function startOver(){
    started = false;

    level = 0;

    gamePattern = [];
}