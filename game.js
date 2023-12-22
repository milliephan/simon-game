var userClickedPattern = [];

gamePattern = [];
buttonColours = ["red" , "blue", "green", "yellow"];
var level = -1;

// play sound 
function playSound(file) {
    var audio = new Audio(`./sounds/${file}.mp3`);
    audio.play();
}

// Get a random color
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // make color flash animation
    $(`.${randomChosenColour}`).fadeOut(200).fadeIn(200);
    // why doesn't it work
    playSound(randomChosenColour);
    level++
    $("h1").text(`Level ${level}`)
}

// game start
var keyPressed = false
if (!keyPressed){
    $(document).keydown(function(){
        nextSequence();
        $("h1").text("Level 0");
        keypressed = true
    });
}
    

// make button press animation
function animatePress(button) {
    $(`.${button}`).addClass("pressed");
    setTimeout(() => {$(`.${button}`).removeClass("pressed")}, 200);
}

// check answer
function checkAnswer(currentLevel) {
    while (!finishedSequence) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log('success');
        } else {
            console.log("wrong");
        }
    }
    
    setTimeout(nextSequence(),1000);
    userClickedPattern = [];
}

function finishedSequence(){
    if (userClickedPattern[currentLevel] === gamePattern[gamePattern.length -1]) {
        return true
    } else {
        return false
    }
}


// detect click at what button
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    // event.target?.attributes?.id.value
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});






