let numOfRounds = 5

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
    const computer = computerSelection
    const player = playerSelection.toLowerCase()
    if (computer === player) {
        return 'draw'
    }
    else if (
    (computer == "rock" && playerSelection == "scissors") ||
    (computer == "scissors" && playerSelection == "paper") ||
    (computer == "paper" && playerSelection == "rock")
    ) {
        return 'lose'
    }
    else {
        return 'win'
    }
}

function game() {
    for (let i = 0; i < numOfRounds; i++) {
        let playerSelection = prompt('Choose your weapon: rock, scissors, or paper?')
        let computerSelection = getComputerChoice()
        console.log(playRound(playerSelection, computerSelection))
    }
}
