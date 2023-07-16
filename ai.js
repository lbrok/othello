function makeMove (array, player, validMoves, turn) {
    let scores = []
    console.log(turn)
    if (validMoves.length != 0) {
        validMoves.forEach(move => {
                let simulatedarray = simulateMove(array, player, move)
                let simulatedscore = minimax(simulatedarray, false, calcOpposingPlayer(player), 0, turn+1)
                scores.push(simulatedscore)
            })
        let moveIndex = scores.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0) //Gets the index of the highest score in the scores array
        console.log(scores)
        return validMoves[moveIndex]
    }
}

function simulateMove (array, player, id) {
    let simulatedarray = []
    let opposingPlayer = calcOpposingPlayer(player)
    const steps = [-8,-7,1,9,8,7,-1,-9]
    let flippedDisks = []
    steps.forEach(step => {
        if (array[(id+step)] == opposingPlayer) {
            if (!((id % 8) == 7 && (step == -7 || step == 1 || step == 9)) || !((id % 8) == 0 && (step == 7 || step == -1 || step == -9))) {
                disksTemp = boardRecursion(array, player, opposingPlayer, id, step, [id])
                flippedDisks = flippedDisks.concat(disksTemp)
            }
        }
    })
    for (let i = 0; i < 64; i++) {
        if (flippedDisks.includes(i)) {
            simulatedarray.push(player)
        } else {
            simulatedarray.push(array[i])
        }
    }
    return simulatedarray
}

function boardRecursion (array, player, opposingPlayer, id, step, disks) {
    if (array[id+step] == opposingPlayer) {
        disks.push(id+step)
        return boardRecursion(array, player, opposingPlayer, id+step, step, disks)
    } else if (array[id+step] == player) {
        return disks
    } else {
        return []
    }
}

function evaluateMove (simulatedarray, player, scoreingarray) {
    let score = 0
    for (let i = 0; i < 64; i++) {
        if (simulatedarray[i] == player) {
            score = score + scoreingarray[i]
        }
    }
    return score
}

function scoringArrays(turn) {
    let scoreArray = []
    if (turn < 13) {
        scoreArray = [5,5,5,5,5,5,5,5,
            5,-50,-50,-50,-50,-50,-50,5,
            5,-50,1,1,1,1,-50,5,
            5,-50,1,1,1,1,-50,5,
            5,-50,1,1,1,1,-50,5,
            5,-50,1,1,1,1,-50,5,
            5,-50,-50,-50,-50,-50,-50,5,
            5,5,5,5,5,5,5,5,
        ]
    } else if (turn > 56) {
        scoreArray = [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,
        ]
    } else {
        scoreArray = [100,-10,5,5,5,5,-10,100,
            -10,-5,-5,-5,-5,-5,-5,-10,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            -10,-5,-5,-5,-5,-5,-5,-10,
            100,-10,5,5,5,5,-10,100,
        ]
    }
    return scoreArray
}

function possibleMoves(board, player) {
    const steps = [-8,-7,1,9,8,7,-1,-9]
    let validMoves = []
    let tempid=0
    let opposingPlayer = calcOpposingPlayer(player)
    board.forEach(posSquare => {
    if (posSquare == '') {
        steps.forEach(step => {
                    if (possibleMovesBoardRecursion(board, player, opposingPlayer, tempid, step, 0) && !validMoves.includes(tempid)) {
                        validMoves.push(tempid)
                    }
                })
            }
            tempid = tempid + 1
        })
    return validMoves
}

function possibleMovesBoardRecursion(board, player, opposingPlayer, id, step, iteration) {
    if (board[(id+step)] == opposingPlayer && (!((id % 8) == 7 && (step == -7 || step == 1 || step == 9)) || !((id % 8) == 0 && (step == 7 || step == -1 || step == -9)))) {
        id = id + step
        iteration = iteration + 1
    return possibleMovesBoardRecursion(board, player, opposingPlayer, id, step, iteration)
    } else if (board[(id+step)] == player && iteration > 0) {
        return true
    } else {
        return false
    }
}

function calcOpposingPlayer(player) {
    let opposingplayer = ''
    if (player == 'white') {
        opposingplayer = 'black'
    } else {
        opposingplayer = 'white'
    }
    return opposingplayer
}


function minimax(array, isMax, player, depth, turn) {
    let currentTurn = turn
    let moves = possibleMoves(array,player)
    if (depth == 3 || moves.length==0) {
        return evaluateMove(array,player,scoringArrays(currentTurn))
    }
    if (isMax) {
        maxScore = -1000
        moves.forEach(maxMove => {
            let tempArray = simulateMove(array, player, maxMove)
            evaluation = minimax(tempArray, false, calcOpposingPlayer(player), (depth+1), (currentTurn+1))
            if (evaluation > maxScore) {
                maxScore = evaluation
                bestMoveFound = maxMove
            }
        })
        return maxScore
    } else {
        minScore = 1000
        moves.forEach(minMove => {
            let tempArray = simulateMove(array, player, minMove)
            evaluation = minimax(tempArray, true, calcOpposingPlayer(player), (depth+1), (currentTurn+1))
            if (evaluation < minScore) {
                minScore = evaluation
            }
        }) 
        return minScore
    }
}

window.makeMove = makeMove;