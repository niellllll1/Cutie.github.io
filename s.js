let boxes = document.querySelectorAll(".box");

let turn = "Player 1";
let isGameOver = false;

const imgPlayer1 = '<img src="7.jpg" alt="Player 1" class="game-img">';
const imgPlayer2 = '<img src="4.jpg" alt="Player 2" class="game-img">';

boxes.forEach(e => {
  e.innerHTML = ""; // Clear the box content
  e.addEventListener("click", () => {
    if (!isGameOver && e.innerHTML === "") {
      e.innerHTML = turn === "Player 1" ? imgPlayer1 : imgPlayer2;
      checkWin();
      checkDraw();
      changeTurn();
    }
  });
});

function changeTurn() {
  turn = turn === "Player 1" ? "Player 2" : "Player 1";
  document.querySelector(".bg").style.left = turn === "Player 1" ? "0" : "85px";
}

function checkWin() {
  let winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;

    if (v0 !== "" && v0 === v1 && v0 === v2) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = `${turn} wins`;
      document.querySelector("#play-again").style.display = "inline";

      for (let j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
        boxes[winConditions[i][j]].style.color = "#000";
      }
    }
  }
}

function checkDraw() {
  if (!isGameOver) {
    let isDraw = true;
    boxes.forEach(e => {
      if (e.innerHTML === "") isDraw = false;
    });

    if (isDraw) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = "It's a Tie ayayay!";
      document.querySelector("#play-again").style.display = "inline";
    }
  }
}

document.querySelector("#play-again").addEventListener("click", () => {
  isGameOver = false;
  turn = "Player 1"; // Reset to Player 1
  document.querySelector(".bg").style.left = "0";
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#play-again").style.display = "none";

  boxes.forEach(e => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "#fff";
  });
});
      
