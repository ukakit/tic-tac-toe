const boxOne = document.querySelector('#box-one');
const boxTwo = document.querySelector('#box-two');
const boxThree = document.querySelector('#box-three');
const boxFour = document.querySelector('#box-four');
const boxFive = document.querySelector('#box-five');
const boxSix = document.querySelector('#box-six');
const boxSeven = document.querySelector('#box-seven');
const boxEight = document.querySelector('#box-eight');
const boxNine = document.querySelector('#box-nine');
const allBoxes = document.querySelectorAll(".box");
const turnIndicator = document.querySelector('.turn-indicator');
const resetButton = document.querySelector("#reset");
const playerOneIndicator = document.querySelector('#player-one-won')
const playerTwoIndicator = document.querySelector('#player-two-won')
const startButton = document.querySelector('#start-button')
const welcomePage = document.querySelector('.welcome-page')
const gamePage = document.querySelector('.game-page')
const playerOneInput = document.querySelector('#player-one-name');
const playerTwoInput = document.querySelector('#player-two-name');


let turn = 1;
let token = 'x';
let playerOneWon = 0;
let playerTwoWon = 0;
let playerOneName;
let playerTwoName;
let currentPlayer;


let currentBoard = [
    [boxOne.innerText,boxTwo.innerText,boxThree.innerText],
    [boxFour.innerText,boxFive.innerText,boxSix.innerText],
    [boxSeven.innerText,boxEight.innerText,boxNine.innerText]
]
const render = function() {
    turnIndicator.innerText = `${currentPlayer}'s turn (${token})`
    playerOneIndicator.innerText = `${playerOneName}: ${playerOneWon}`
    playerTwoIndicator.innerText = `${playerTwoName}: ${playerTwoWon}`
}

const init = function () {
    allBoxes.forEach(box => {
        box.addEventListener('click', marker)
    })
    render()
}

const handleStart = function (event) {
    event.preventDefault();
    playerOneName = playerOneInput.value
    playerTwoName = playerTwoInput.value
    welcomePage.classList.toggle('hidden');
    gamePage.classList.toggle('hidden');
    currentPlayer = playerOneName
    init()
}

const removeEventListener = function () {
    allBoxes.forEach(box => {
        box.removeEventListener('click', marker)
    })
}

const switchTurn = function () {
    if (turn === 1){
        turn = 2
        currentPlayer = playerTwoName
    } else {
        turn = 1
        currentPlayer = playerOneName
    }
}

const switchToken = function () {
    if (token === "x") {
        token = "o"
    } else {
        token = "x"
    }
}

const updateCurrentBoard = function () {
    currentBoard = [
        [boxOne.innerText,boxTwo.innerText,boxThree.innerText],
        [boxFour.innerText,boxFive.innerText,boxSix.innerText],
        [boxSeven.innerText,boxEight.innerText,boxNine.innerText]
    ]
}




const checkWinner = function () {
    let firstRow = currentBoard[0];
    let secondRow = currentBoard[1];
    let thirdRow = currentBoard [2];
    let firstColumn = [currentBoard[0][0],currentBoard[1][0],currentBoard[2][0]];
    let secondColumn = [currentBoard[0][1],currentBoard[1][1],currentBoard[2][1]];
    let thirdColumn = [currentBoard[0][2],currentBoard[1][2],currentBoard[2][2]];
    let firstDiag = [currentBoard[0][0],currentBoard[1][1],currentBoard[2][2]];
    let secondDiag = [currentBoard[0][2],currentBoard[1][1],currentBoard[2][0]];
    if (
        firstRow.every(box => box === 'x')||
        secondRow.every(box => box === 'x')||
        thirdRow.every(box => box === 'x')||
        firstColumn.every(box => box === 'x')||
        secondColumn.every(box => box === 'x')||
        thirdColumn.every(box => box === 'x')||
        firstDiag.every(box => box === 'x')||
        secondDiag.every(box => box === 'x')
        ) {
            playerOneWon ++
            playerOneIndicator.innerText = `${playerOneName}: ${playerOneWon}`
            alert(`${playerOneName} Won!`)
            resetButton.classList.toggle('hidden')
            removeEventListener()
    } else if(
        firstRow.every(box => box === 'o')||
        secondRow.every(box => box === 'o')||
        thirdRow.every(box => box === 'o')||
        firstColumn.every(box => box === 'o')||
        secondColumn.every(box => box === 'o')||
        thirdColumn.every(box => box === 'o')||
        firstDiag.every(box => box === 'o')||
        secondDiag.every(box => box === 'o')
        ) {
            playerTwoWon ++
            playerTwoIndicator.innerText = `${playerTwoName}: ${playerTwoWon}`
            alert(`${playerTwoName} Won!`)
            resetButton.classList.toggle('hidden')
            removeEventListener()
    } else if (currentBoard.flat().every(token => token !== "")){
            alert('Tie!')
            resetButton.classList.toggle('hidden')
            removeEventListener()
        }
}
        
const marker = function (event) {
    if (event.target.innerText === ""){
        event.target.innerText = token
        switchTurn()
        switchToken()
        render()
        updateCurrentBoard()
        checkWinner()
    } else {
        alert ("Invalid Square")
    }
}

const resetBoard = function () {
    turn = 1;
    token = 'x';
    for (box of allBoxes) {
        box.innerText = ""
    }
    init()
    render()
    updateCurrentBoard()
    resetButton.classList.toggle('hidden')
}

resetButton.addEventListener('click', resetBoard)
startButton.addEventListener('click', handleStart)
// start
init()
