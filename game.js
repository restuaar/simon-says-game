let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;

let level = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  let element = $("#" + currentColour);
  element.addClass("pressed");
  setTimeout(function () {
    element.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  let index = currentLevel - 1;
  if (!(gamePattern[index] === userClickedPattern[index])) {
    $("body").addClass("game-over");
    setTimeout(function () {
      playSound("wrong");
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $(".btn").off("click");
    }, 200);

    startOver();
    return;
  }

  if (currentLevel === level) {
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameStart = false;
  level = 0;
}

$(document).keypress(function () {
  $(".btn").click(function () {
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length);
  });

  if (!gameStart) {
    gameStart = true;
    nextSequence();
  }
});
