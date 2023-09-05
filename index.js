var gameover = false;
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamestart = true;
// var sound=["./sounds/blue.mp3","./sounds/green.mp3","./sounds/red.mp3","./sounds/yellow.mp3"];

var i = 0;
function nextSequence() {
  if (gameover === true) {
    gamePattern = [];
    gameover = false;

    $("body").removeClass("game-over");
  }
  if (gamestart === true) {
    gamestart = false;
  }
  var r = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[r];
  gamePattern.push(randomChosenColour);
  // alert(gamePattern);

  // setTimeout(function () {
  //     new Audio("sounds/"+randomChosenColour+".mp3").play();
  // },1000);
  $("h1").text("LEVEL " + gamePattern.length);
  new Audio("sounds/" + randomChosenColour + ".mp3").play();
  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  if (gameover !== true&&gamestart!==true) {
    var a = this.id;
    new Audio("sounds/" + a + ".mp3").play();
    $("#" + a).addClass("pressed");
    setTimeout(function () {
      $("#" + a).removeClass("pressed");
    }, 100);
    // alert(i);
    // alert(a);
    // alert("gamePattern.length"+gamePattern.length);
    if (gamePattern[i] === a && i + 1 < gamePattern.length) {
      i++;

      // alert(i);
      return;
    } else if (gamePattern[i] === a && gamePattern.length === i + 1) {
      i = 0;
      // alert("wrong");
      setTimeout(function () {
        nextSequence();
      }, 500);

      return;
    } else if (gamePattern[i] !== a) {
      gameover = true;
      i = 0;
      $("h1").text("Game Over!!😖   Press any key or replay button to restart");
      $("body").addClass("game-over");
      new Audio("sounds/wrong.mp3").play();
      document.getElementsByClassName("str")[0].style.visibility = "visible";
      document.getElementsByClassName("str")[0].textContent = "Replay";
      $(".str").addClass("restart");
      return;
    }
  }
});
document.querySelector(".str").addEventListener("click",(function () {
  if (gameover === true || gamestart === true) {
    document.getElementsByClassName("str")[0].style.visibility = "hidden";
    nextSequence();
  }
}));
$(document).keydown(function () {
  if (gameover === true || gamestart === true) {
    document.getElementsByClassName("str")[0].style.visibility = "hidden";
    nextSequence();
  }
});
