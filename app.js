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
const allSquares = document.querySelectorAll("#gameboard .square")
console.log(allSquares)

findValidMoves()


allSquares.forEach(square => {
    if (!square.hasChildNodes()) {
        square.addEventListener('click', getClickedSquare)
    }
})

function getClickedSquare(e) {
    let clickedSquare = Number(e.target.getAttribute('square-id'))
    console.log(clickedSquare)
    placeDisk(clickedSquare)
}

function placeDisk(id) {
    let targetSquare = document.querySelector('div[square-id="' + id + '"]')
    targetSquare.removeEventListener('click', getClickedSquare, false)
    targetSquare.innerHTML = disk
    targetSquare.firstChild.firstChild.classList.add(playerTurn)
    changePlayer()
}

function changePlayer() {
    if (playerTurn === 'white') {
        playerTurn = 'black'
    } else {
        playerTurn = 'white'
    }
    playerDisplay.textContent = playerTurn
    findValidMoves()
}

function findValidMoves() {
    const validMoves = []
    const Up = -8
    const UR = -7
    const Right = 1
    const DR = 9
    const Down = 8
    const DL = 7
    const Left = -1
    const UL = -9

    allSquares.forEach(square => { 
        square.classList.remove('viable')
        if (!square.hasChildNodes()) {
            let id = Number(square.getAttribute('square-id'))

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
            neighDirections.forEach(step => {
                if (squareRecursion(id, step, 0) && !validMoves.includes(id)) {
                    validMoves.push(id)
                    let validSquare = document.querySelector('div[square-id="' + id + '"]')
                    validSquare.classList.add('viable')
                }
            })
        }
    })
}

function squareRecursion(start, step, iteration) {
    id = start + step
    iteration = iteration + 1
    let targetSquare = document.querySelector('div[square-id="' + id + '"]')
    if (targetSquare != null && targetSquare.hasChildNodes()) {
        let color = targetSquare.querySelector('.piece').querySelector('svg').getAttribute('class')
        if (color == playerTurn) {
            if (iteration == 1) {
                return false
            } else {
                return true
            }
        } else {
            return squareRecursion(id, step, iteration)
        }
    } else {
        return false
    }
}