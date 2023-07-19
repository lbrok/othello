const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const scoreBlack = document.querySelector("#score-black")
const scoreWhite = document.querySelector("#score-white")
let playerTurn = 'white'
let userColor = 'black'
playerDisplay.textContent = playerTurn
let boardArray = []
let turn = 1
let noValidMovesCount = 0

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
const allSquares = document.querySelectorAll("#gameboard .square")
let validMoves = findValidMoves()

if (getRandomInt(2) == 0) {
    userColor = 'white'
    exePlayerTurn()
} else {
    exeAITurn()
}

function exePlayerTurn () {
    allSquares.forEach(square => {
        if (!square.hasChildNodes()) {
            square.addEventListener('click', getClickedSquare)
        }
    })
}
function exeAITurn () {
    let move = makeMove(getBoardArray(), playerTurn, validMoves, turn)
    placeDisk(move)
}

function getClickedSquare(e) {
    let clickedSquare = Number(e.target.getAttribute('square-id'))
    placeDisk(clickedSquare)
}

function placeDisk(id) {
    turn = turn + 1
    if (validMoves.includes(id)) {
        let targetSquare = document.querySelector('div[square-id="' + id + '"]')
        targetSquare.removeEventListener('click', getClickedSquare, false)
        targetSquare.innerHTML = disk
        targetSquare.firstChild.firstChild.classList.add(playerTurn)
        flipDisks(id)
        changePlayer()
        validMoves = findValidMoves()
        if (validMoves.length == 0) {
            changePlayer()
            validMoves = findValidMoves()
            noValidMovesCount = noValidMovesCount + 1
        } else {
            noValidMovesCount = 0
        }
    }
    if (playerTurn==userColor) {
        exePlayerTurn()
    } else {
        exeAITurn()
    }
}

function changePlayer() {
    let element = document.querySelector('#player')
    element.style.color = playerTurn
    if (playerTurn === 'white') {
        playerTurn = 'black'
    } else {
        playerTurn = 'white'
    }
    playerDisplay.textContent = playerTurn
    element.style.backgroundColor = playerTurn
}

function findValidMoves() {
    let validMoves = []
    let numOfBlack = 0
    let numOfWhite = 0

    allSquares.forEach(square => { 
        square.classList.remove('viable')
        if (!square.hasChildNodes()) {
            let id = Number(square.getAttribute('square-id'))

            neighDirections = findNeighbours(id)
            neighDirections.forEach(step => {
                if (squareRecursion(id, step, 0, false, []) && !validMoves.includes(id)) {
                    validMoves.push(id)
                    let validSquare = document.querySelector('div[square-id="' + id + '"]')
                    validSquare.classList.add('viable')
                }
            })
        } else {
            if (square.firstChild.firstChild.classList[0] == 'black') {
                numOfBlack = numOfBlack + 1
            } else {
                numOfWhite = numOfWhite + 1
            }
        }
    })
    scoreBlack.textContent = numOfBlack
    scoreWhite.textContent = numOfWhite
    return validMoves
}

function findNeighbours(id) {
    const Up = -8
    const UR = -7
    const Right = 1
    const DR = 9
    const Down = 8  
    const DL = 7
    const Left = -1
    const UL = -9

    let squareUp = document.querySelector('div[square-id="' + (id+Up) + '"]')
    let squareUR = document.querySelector('div[square-id="' + (id+UR) + '"]')
    let squareRight = document.querySelector('div[square-id="' + (id+Right) + '"]')
    let squareDR = document.querySelector('div[square-id="' + (id+DR) + '"]')
    let squareDown = document.querySelector('div[square-id="' + (id+Down) + '"]')
    let squareDL = document.querySelector('div[square-id="' + (id+DL) + '"]')
    let squareLeft = document.querySelector('div[square-id="' + (id+Left) + '"]')
    let squareUL = document.querySelector('div[square-id="' + (id+UL) + '"]')

    let neighDirections = []
    if (squareUp != null && squareUp.hasChildNodes()) {
        neighDirections.push(Up)
    } 
    if (squareUR != null && squareUR.hasChildNodes()) {
        neighDirections.push(UR)
    }
    if (squareRight != null && squareRight.hasChildNodes()) {
        neighDirections.push(Right)
    }
    if (squareDR != null && squareDR.hasChildNodes()) {
        neighDirections.push(DR)
    }
    if (squareDown != null && squareDown.hasChildNodes()) {
        neighDirections.push(Down)
    }
    if (squareDL != null && squareDL.hasChildNodes()) {
        neighDirections.push(DL)
    }
    if (squareLeft != null && squareLeft.hasChildNodes()) {
        neighDirections.push(Left)
    }
    if (squareUL != null && squareUL.hasChildNodes()) {
        neighDirections.push(UL)
    }
    return neighDirections    
}

function squareRecursion(start, step, iteration, flip, squares) {
    id = start + step
    iteration = iteration + 1
    let targetSquare = document.querySelector('div[square-id="' + id + '"]')
    if (targetSquare != null && targetSquare.hasChildNodes()) {
        if ((start % 8) == 7 && (step == -7 || step == 1 || step == 9)) {
            return false
        }
        if ((start % 8) == 0 && (step == 7 || step == -1 || step == -9)) {
            return false
        }
        let color = targetSquare.querySelector('.piece').querySelector('svg').getAttribute('class')
        if (color == playerTurn) {
            if (iteration == 1) {
                return false
            } else {
                if (flip) {
                    squares.forEach(squareID =>{
                        square = document.querySelector('div[square-id="' + squareID + '"]')
                        oppositeColor = square.firstChild.firstChild.classList[0]
                        square.firstChild.firstChild.classList.remove(oppositeColor)
                        square.firstChild.firstChild.classList.add(playerTurn)
                    })
                    return true
                } else if (!flip) {
                    return true
                }
            }
        } else {
            squares.push(id)
            return squareRecursion(id, step, iteration, flip, squares)
        }
    } else {
        return false
    }
}

function flipDisks(id) {
    let neighbours = findNeighbours(id)
    neighbours.forEach(step => {
        squareRecursion(id, step, 0, true, [])
    })
}

function getBoardArray() {
    let boardArray = []
    squares = document.querySelectorAll("#gameboard .square")
    squares.forEach(square => {
        if (square.hasChildNodes()) {
            boardArray.push(square.firstChild.firstChild.classList[0])
        }
        else {
            boardArray.push('')
        }
    })
    return boardArray
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }