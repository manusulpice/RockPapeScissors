
// Variables
let winScore = 0;
let playerScore= 0;
let compScore =0;

const threeButton = document.getElementById('3');
const fiveButton = document.getElementById('5');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const userScoreSpan = document.getElementById('user-score');
const compScoreSpan = document.getElementById('comp-score');
const winPointsSpan = document.getElementById('win-points');

const messageParagraph = document.getElementById('message');

// start new game
// hide weapons, start and reset until number of point to win are chosen
hideUnhide('Initial');


// Event listeners get number of points to win (winScore)
threeButton.addEventListener('click', () => startgame(3));
fiveButton.addEventListener('click', () => startgame(5));

// Event listeners start - reset the game
startButton.addEventListener('click', () => hideUnhide('Started'));
resetButton.addEventListener('click', () => {
  hideUnhide('Initial'); 
  winScore = 0; 
  playerScore = 0;
  compScore = 0;
  winPointsSpan.textContent = winScore;
  userScoreSpan.textContent = playerScore;
  compScoreSpan.textContent = compScore;
  messageParagraph.textContent = 'Make your move!';
})

// Event listeners weapons
rockButton.addEventListener('click', () => playGame('rock'));
paperButton.addEventListener('click', () => playGame('paper'));
scissorsButton.addEventListener('click', () => playGame('scissors'));

// function hide unhide screen elements depending on game status (Initial - Start - Started - Completed)
function hideUnhide(gameStatus) {
  if(gameStatus === 'Initial') {
    document.getElementById("weapons").style.display = "none";
    document.getElementById("start-reset").style.display = "none";
    document.getElementById("scores").style.display = "none";
    document.getElementById("points").style.display = "";
  } else if(gameStatus === 'Start') {
    document.getElementById("weapons").style.display = "none";
    document.getElementById("start-reset").style.display = "";
    document.getElementById("start").style.display = "";
    document.getElementById("scores").style.display = "none";
    document.getElementById("points").style.display = "none";
  } else if (gameStatus === 'Started') {
    document.getElementById("weapons").style.display = "";
    document.getElementById("start-reset").style.display = "none";
    document.getElementById("scores").style.display = "";
    document.getElementById("points").style.display = "none";
  } else if (gameStatus === 'Completed') {
    document.getElementById("weapons").style.display = "none";
    document.getElementById("start-reset").style.display = "";
    document.getElementById("scores").style.display = "";
    document.getElementById("points").style.display = "none";
    document.getElementById("start").style.display = "none";
  }
}

// function startgame()
function startgame(winPoints) {
  winScore = winPoints
  winPointsSpan.textContent = winScore;
  hideUnhide('Start') 
}

// Function to generate the computer's choice
function getCompChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}


// function to compare scores and assign winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'tie';
  }
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'user';
  } else {
    return 'computer';
  }
}

  // function checkWinner - check if computer or player reached points to win
  function checkWinner(resultMessage) {
    if(playerScore === winScore || compScore === winScore){
      // hide/unhide screen elemnts 
      hideUnhide('Completed');

      // player wins
      if(playerScore === winScore) {
        resultMessage = resultMessage + ' -> Congratulation, you win the game!';
        messageParagraph.textContent = resultMessage;
      }

      // computer wins
      if(compScore === winScore) {
        resultMessage = resultMessage + ' -> You lost the game!';
        messageParagraph.textContent = resultMessage;
      }
    }
  }


// function playGame
function playGame(userChoice) {
  const compChoice = getCompChoice();
  const winner = determineWinner(userChoice, compChoice);

  // determine winner
  let resultMessage = '';
  if (winner === 'tie') {
    resultMessage = 'It is a tie! You both chose ' + capitalize(userChoice) + '.';
  } else if (winner === 'user') {
    playerScore++;
    resultMessage = 'You win! ' + capitalize(userChoice) + ' beats ' + capitalize(compChoice) + '.';
  } else {
    compScore++;
    resultMessage = 'Computer wins! ' + capitalize(compChoice) + ' beats ' + capitalize(userChoice) + '.';
  }

  // Update user and compute scores
  userScoreSpan.textContent = playerScore;
  compScoreSpan.textContent = compScore;

  // Update message
  messageParagraph.textContent = resultMessage;

  checkWinner(resultMessage);
}

// function to capatalise first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}