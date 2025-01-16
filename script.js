let images = [
  '4.jpeg', 
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpeg',
  'nm.jpg' 
];

let imageArray = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let score = 0;
let lives = 3;
const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives'); 
const resetButton = document.querySelector('.reset-button');

function initGame() {
  imageArray = [...images, ...images];
  imageArray = imageArray.sort(() => 0.5 - Math.random());
  matchesFound = 0;
  lives = 3; 
  updateLives();
  gameBoard.innerHTML = ''; 
  imageArray.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;
    card.dataset.index = index;
    card.style.backgroundImage = `url(${image})`;
    card.style.backgroundSize = 'cover';
    gameBoard.appendChild(card);
  });
  setTimeout(hideAllCards, 3000);
}

function hideAllCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.backgroundImage = '';
    card.classList.remove('flipped');
    card.addEventListener('click', flipCard); 
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('matched')) return; 
  if (this === firstCard) return; 

  this.classList.add('flipped');
  this.style.backgroundImage = `url(${this.dataset.image})`;
  this.style.backgroundSize = 'cover';

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true; 
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    disableCards();
    matchesFound++;
    score++;
    updateScore();
    if (matchesFound === images.length) {
      setTimeout(() => {
        alert('You won! All matches found!');
        resetGame(); 
      }, 500);
    }
  } else {
    lives--;
    updateLives();
    if (lives === 0) {
      setTimeout(() => {
        alert('Game Over!');
        resetGame();
      }, 1000);
    }
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.style.backgroundImage = '';
    secondCard.style.backgroundImage = '';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function updateScore() {
  const scoreElement = document.getElementById('score'); 
  if (scoreElement) { 
    scoreElement.textContent = score;
  } else {
    console.error("Element with ID 'score' not found.");
  }
}

function updateLives() {
  const livesElement = document.getElementById('lives'); 
  if (livesElement) { 
    livesElement.textContent = lives; 
  } else {
    console.error("Element with ID 'lives' not found.");
  }
}

function resetGame() {
  score = 0; 
  updateScore();
  initGame();
}

resetButton.addEventListener('click', resetGame);

initGame();
    
