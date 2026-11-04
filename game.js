// Mga kulay na puwedeng piliin ng computer para sa sequence.
var buttonColours = ["red", "blue", "green", "yellow"];

// Dito iniimbak ang sequence ng game at ang sagot ng player.
var gamePattern = [];
var userClickedPattern = [];

// Game state: magsisimula lang kapag may key press.
var started = false;
var level = 0;

// Simulan ang bagong round ng sequence at ipakita ang unang level.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // Pumili ng random na kulay at idagdag ito sa sequence ng game.
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // I-flash ang napiling button at patugtugin ang katugmang tunog.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Simula sa unang keyboard key press; huwag magsimula muli habang naglalaro.
$(document).on("keydown", function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

// Basahin at suriin ang sagot tuwing pinipindot ng player ang isang kulay.
$(".btn").on("click", function () {
  // Huwag tumanggap ng sagot bago magsimula o kapag kumpleto na ang round.
  if (!started || userClickedPattern.length >= gamePattern.length) {
    return;
  }

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  // Patugtugin at i-animate ang pinindot na button.
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Suriin ang pinakahuling sagot ayon sa index nito sa sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// I-verify kung tama ang sagot at kung kumpleto na ang kasalukuyang sequence.
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // Bigyan ng sandaling pahinga bago idagdag ang susunod na kulay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // I-play ang maling sagot na sound at ipakita sandali ang game-over effect.
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// I-reset ang game state para makapagsimula muli sa susunod na key press.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Reusable helper para patugtugin ang sound file ayon sa pangalan ng kulay.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reusable helper para ipakita ang visual press effect sa button.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}