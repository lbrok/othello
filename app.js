const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
let playerTurn = 'white'
playerDisplay.textContent = playerTurn

const startPieces = [
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','',disk,disk,'','','',
    '','','',disk,disk,'','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.setAttribute('square-id', i)
        gameBoard.append(square)

        if (i == 27 || i == 36) {
            square.firstChild.firstChild.classList.add('white')
        }
        if (i == 28 || i == 35) {
            square.firstChild.firstChild.classList.add('black')
        }
    })
}
createBoard()

let allSquares = document.querySelectorAll("#gameboard .square")
let emptySquares = []
allSquares.forEach(square => {
    if (!square.hasChildNodes()) {
        emptySquares.push(Number(square.getAttribute('square-id')))
        //console.log(square.getAttribute('square-id'))
        //downMoves(Number(square.getAttribute('square-id')))
        if (downMoves(Number(square.getAttribute('square-id')))) {
            console.log(Number(square.getAttribute('square-id')))
        }
    }
})
//console.log(emptySquares)

function downMoves(id) {
    //console.log(id)
    id = id + 8
    if (id < 64) {
        let targetSquare = document.querySelector('div[square-id="' + id + '"]')
        if (targetSquare.hasChildNodes()) {
            let color = targetSquare.querySelector('.piece').querySelector('svg').getAttribute('class')
            if (color != playerTurn){
                return true
            }
        }
            downMoves(id)
    }
    return false
}

function changePlayer() {
    if (playerTurn === 'white') {
        playerTurn = 'black'
    } else {
        playerTurn = 'white'
    }
    playerDisplay.textContent = playerTurn
}