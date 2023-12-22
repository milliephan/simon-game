var userClickedPattern = [];

gamePattern = [];
buttonColours = ["red" , "blue", "green", "yellow"];
var level = 0;
var keyPressed = false;

// Get a random color
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // make color flash animation
    keyFlash(randomChosenColour);
    playSound(randomChosenColour);
        level++
        $("h1").text(`Level ${level}`)
}

// key flash animation
function keyFlash(button){
    $(`.${button}`).fadeOut(200).fadeIn(200);
}

// button click animation
function animatePress(button) {
    $(`.${button}`).addClass("pressed");
    setTimeout(() => {$(`.${button}`).removeClass("pressed")}, 200);
}

// buttonclick wrong button 
function animateWrongPress() {
    $("body").addClass("game-over");
    setTimeout(() => {$("body").removeClass("game-over")}, 200);
}

// play sound
function playSound(file) {
    var audio = new Audio(`./sounds/${file}.mp3`);
    audio.play();
}

// reset all values
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    keyPressed = false;
    level = 0;
}

// execute when they get it wrong
function gameOver(){
    playSound("wrong");
    animateWrongPress();
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
}

// check for match
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log(userClickedPattern[currentLevel])
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            setTimeout(function(){
                userClickedPattern = []; 
            }, 1000);
            console.log("passed")
        } 
    } else {
        gameOver();
    }
}

// press key
$(document).keydown(function(){
    if (!keyPressed){
        nextSequence();
        keyPressed = true
    }
});

// click button
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


