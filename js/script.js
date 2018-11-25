document.addEventListener("DOMContentLoaded", function() {

  let numSquares = 6;
  let colors = [];
  let pickedColor;
  let squares = document.querySelectorAll(".square");
  let colorDisplay = document.getElementById("colorDisplay");
  let messageDisplay = document.getElementById("message");
  const h1 = document.querySelector("h1");
  const resetButton = document.getElementById("reset");
  const modeButtons = document.querySelectorAll(".mode");
  const container = document.getElementById("container");
  const congratsMsg = document.querySelector(".congratsMsg");
  let counter = 0;

  init();

  function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i += 1) {
      modeButtons[i].addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        modeButtons[2].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Easy") {
          numSquares = 3;
          congratsMsg.style.display = "none";
        } else if (this.textContent === "Hard") {
          numSquares = 6;
          congratsMsg.style.display = "none";
        } else {
          numSquares = 9;
          congratsMsg.style.display = "none";
        }
        reset();
      });
    }
  }

  function setupSquares() {
    for (let i = 0; i < squares.length; i += 1) {
      squares[i].addEventListener("click", function() {
        // every time square is clicked, counter adds 1
        counter += 1;

        // grab color of clicked square
        let clickedColor = this.style.backgroundColor;
        // compare color to pickedColor
        if (clickedColor === pickedColor) {
          messageDisplay.textContent = "Correct!";
          resetButton.textContent = "Play Again?";
          changeColors(clickedColor);
          h1.style.backgroundColor = clickedColor;
          numGuessesMsg();
          container.classList.add("notClickable");
        } else {
          this.style.backgroundColor = "#232323";
          messageDisplay.textContent = "Try Again";
        }
      });
    }
  }

  function reset() {
    colors = generateRandomColors(numSquares);
    // pick a new random color
    pickedColor = pickColor();
    // change color display to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    // change colors of squares
    for (let i = 0; i < squares.length; i += 1) {
      if (colors[i]) {
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
      } else {
        squares[i].style.display = "none";
      }
    }
    h1.style.backgroundColor = "steelblue";
    counter = 0;
    container.classList.remove("notClickable");
  }

  resetButton.addEventListener("click", function() {
    congratsMsg.style.display = "none";
    reset();
  });

  function changeColors(color) {
    for (let i = 0; i < squares.length; i += 1) {
      // change each color to match given color
      squares[i].style.backgroundColor = color;
    }
  }

  function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i += 1) {
      arr.push(randomColor());
    }
    return arr;
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  // number of guesses message
  function numGuessesMsg() {
    congratsMsg.style.display = "block";
    if (counter === 1) {
      return (congratsMsg.textContent = `You've had ${counter} guess!`);
    } else if (counter > 7) {
      return (congratsMsg.textContent = `You've had ${counter} guesses!`);
    } else if (counter > 5) {
      return (congratsMsg.textContent = `You've had ${counter} guesses!`);
    } else {
      return (congratsMsg.textContent = `You've had ${counter} guesses!`);
    }
  }

  // initialize it
  function init() {
    setupModeButtons();
    setupSquares();
    reset();
	}
	
});