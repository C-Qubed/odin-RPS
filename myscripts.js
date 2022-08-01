// add stylesheet and pretty css!
// use closure to enclose player score and rounds to win in displayResult?
// seperate ui out from functions
// add R/P/S images on white backgrounds (cards)
    // light them up and slight glow (like the drumset) when playing a round
// add to end-round function
    // display winner
    // should lock out all buttons
    // play again should reset the UI

let playerScore = 0
let compScore = 0
let roundsToWin = 5

const player = document.querySelector('#player-score')
const computer = document.querySelector('#computer-score')
const computerDecision = document.getElementById('opp-RPS-choice')
const playerDecision = document.getElementById('miku-RPS-choice')
const result = document.querySelector('.result > h2')
const rpsPlayerButtons = document.querySelectorAll('.RPS-player-input');
const subHeading = document.querySelector('#text-result')
let restartBtn = document.querySelector('.restart-btn')
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")


function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

function getComputerChoice() {
    // generate random decimal and multiply by 10 -- use floor to get whole num
    let computerNum = (Math.floor(Math.random() * 10))
    
    if (computerNum <= 3) {
        return 'rock'
    }
    else if (computerNum <= 6) {
        return 'paper'
    }
    else if (computerNum <= 9) {
        return 'scissors'
    }
    else {
        getComputerChoice()
    }
}

function playRound(computerSelection, playerSelection) {
    const computer = computerSelection;
    const player = playerSelection.toLowerCase();
    playerDecision.src = `images/${playerSelection}.jpg`
    computerDecision.src = `images/${computerSelection}.jpg`
    if (computer === player) {
        subHeading.textContent = `You and Luka both chose ${playerSelection}. Draw.`
        return 'draw'
    }
    else if (
    (computer == "rock" && playerSelection == "scissors") ||
    (computer == "scissors" && playerSelection == "paper") ||
    (computer == "paper" && playerSelection == "rock")
    ) {
        let playerCapital = toTitleCase(playerSelection)
        subHeading.textContent = `${playerCapital} loses to ${computerSelection}...`
        return 'lose'
    }
    else {
        let playerCapital = toTitleCase(playerSelection)
        subHeading.textContent = `${playerCapital} wins against ${computerSelection}~!`
        return 'win'
    }
}

function updateScore (gameResult) {    
    if (gameResult === 'win') {
        playerScore++
        player.textContent = `Player: ${playerScore} points!`
    }
    else if (gameResult === 'lose') {
        compScore++
        computer.textContent = `Computer: ${compScore} points!`
    }
    else {
        result.textContent = 'Result: Draw...'
    }
    if (playerScore >= roundsToWin || compScore >= roundsToWin) {
        endGame()
    }
}

function endGame() {
    if (playerScore >= roundsToWin) {
        modal.style.display = "block"
    }
    else if (compScore >= roundsToWin)
        modal.style.display = "block"
    }


// on button click, play one round passing in id as string to playRound
rpsPlayerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // check if game is over -- if it is, open the endgame modal
        if (playerScore >= roundsToWin || compScore >= roundsToWin) {
            endGame()
        }
        // else, play a round
        else {
            let gameResult = (playRound(getComputerChoice(), button.id))
            updateScore(gameResult)
        }
    });
});

closeBtn.onclick = function(){
    modal.style.display = "none"
  }

window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
  }
}

restartBtn.onclick = function() {
    playerScore = 0
    compScore = 0
    player.textContent = `Player: 0 points!`
    computer.textContent = `Computer: 0 points!`
    modal.style.display = 'none'
}

