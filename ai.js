function makeMove (array, player, validMoves, turn) {
    let bestMove = 0
    let bestScore = 0
    if (validMoves.length != 0) {
    validMoves.forEach(move => {
            simulatedarray = simulateMove(array, player, move)
            scoreingarray = scoringArrays(turn)
            simulatedscore = evaluateMove(simulatedarray, player, scoreingarray)
            if (simulatedscore > bestScore){
                bestMove = move
                bestScore = simulatedscore
            }    
        })
    console.log(minimax(array, player, true, 0))
    return bestMove}
}

function simulateMove (array, player, id) {
    let simulatedarray = []
    if (player == 'white') {
        opposingPlayer = 'black'
    } else {
        opposingPlayer = 'white'
    }
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
    //simulatedarray.forEach(disk => {
        //if (disk == player) {
            //score = score + 1
        //}
    //})
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
            5,-5,-5,-5,-5,-5,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,-5,-5,-5,-5,-5,5,
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
        scoreArray = [10,1,5,5,5,5,1,10,
            1,-5,-5,-5,-5,-5,-5,1,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            5,-5,1,1,1,1,-5,5,
            1,-5,-5,-5,-5,-5,-5,1,
            10,1,5,5,5,5,1,10,
        ]
    }
    return scoreArray
}

function possibleMoves(board, player) {
    const steps = [-8,-7,1,9,8,7,-1,-9]
    let validMoves = []
    let tempid=0
    if (player == 'white') {
        opposingPlayer == 'black'
    } else {
        opposingPlayer == 'white'
    }
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


function minimax(array, player, isMax, depth) {
    let tempBoard = array
    let tempScore = 0
    let color = player
    let opposingColor = calcOpposingPlayer(color)
    let currentDepth = depth

    if (currentDepth == 5) {
        console.log('Depth 5 reached')
        tempScore = evaluateMove(tempBoard,player,scoringArrays(1))
        return tempScore
    }
    let viableMoves = possibleMoves(tempBoard, color)
    if (isMax){
        let maxScore = -1000
        viableMoves.forEach(maxMove => {
            let tempSimBoard = simulateMove(tempBoard,color,maxMove)
            console.log([depth, tempSimBoard])
            tempScore = minimax(tempSimBoard,opposingColor,false,(currentDepth+1))
            if (tempScore > maxScore) {
                maxScore = tempScore
            }
        })
    } else {
        let minScore = 1000
        viableMoves.forEach(minMove => {
            let tempSimBoard = simulateMove(tempBoard,color,minMove)
            console.log([depth, tempSimBoard])
            tempScore = minimax(tempSimBoard, opposingColor, true, (currentDepth+1))
            if (tempScore < minScore) {
                minScore = tempScore
            }
        })
    }
}

window.makeMove = makeMove;