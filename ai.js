let searchedMoves = 0

function makeMove (array, player, validMoves, turn) {
    let scores = []
    console.log(turn)
    validMoves = sortMoves(validMoves)
    if (validMoves.length != 0) {
        validMoves.forEach(move => {
                let simulatedarray = simulateMove(array, player, move)
                let simulatedscore = minimax(simulatedarray, false, calcOpposingPlayer(player), 0, turn+1, -100000, 100000)
                scores.push(simulatedscore)
            })
        let moveIndex = scores.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0) //Gets the index of the highest score in the scores array
        //console.log(scores)
        //console.log([moveIndex,scores[moveIndex]])
        console.log(searchedMoves)
        searchedMoves = 0
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
    let opponentscore = 0
    for (let i = 0; i < 64; i++) {
        if (simulatedarray[i] == player) {
            score = score + scoreingarray[i]
        } else {
            opponentscore = opponentscore + scoreingarray[i]
        }
    }
    score = score - opponentscore
    return score
}

function scoringArrays(turn) {
    let scoreArray = []
    if (turn < 13) {
        scoreArray = [1000,30,50,50,50,50,30,1000,
            30,-50,-30,-10,-10,-30,-50,30,
            50,-30,1,1,1,1,-30,50,
            50,-10,1,1,1,1,-10,50,
            50,-10,1,1,1,1,-10,50,
            50,-30,1,1,1,1,-30,50,
            30,-50,-30,-10,-10,-30,-50,30,
            1000,30,50,50,50,50,30,1000,
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
        scoreArray = [500,-20,20,5,5,20,-20,500,
            -20,-40,-5,-5,-5,-5,-40,-20,
            20,-5,15,3,3,15,-5,20,
            5,-5,3,3,3,3,-5,5,
            5,-5,3,3,3,3,-5,5,
            20,-5,15,3,3,15,-5,20,
            -20,-40,-5,-5,-5,-5,-40,-20,
            500,-20,20,5,5,20,-20,500,
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


function minimax(array, isMax, player, depth, turn, alpha, beta) {
    searchedMoves = searchedMoves + 1
    let currentTurn = turn
    let moves = possibleMoves(array,player)
    moves = sortMoves(moves)
    if (depth == 7 || moves.length==0) {
        return evaluateMove(array,player,scoringArrays(currentTurn))
    }
    if (isMax) {
        maxScore = -100000
        for (let i = 0; i < moves.length; i++) {
            let maxMove = moves[i]
            let tempArray = simulateMove(array, player, maxMove)
            evaluation = minimax(tempArray, false, calcOpposingPlayer(player), (depth+1), (currentTurn+1), alpha, beta)
            if (evaluation > maxScore) {
                maxScore = evaluation
            }
            if (evaluation > alpha) {
                alpha = evaluation
            }
            if (beta <= alpha) {
                break
            }
        }
        return maxScore
    } else {
        minScore = 100000
        for (let i = 0; i < moves.length; i++) {
            let minMove = moves[i]
            let tempArray = simulateMove(array, player, minMove)
            evaluation = minimax(tempArray, true, calcOpposingPlayer(player), (depth+1), (currentTurn+1), alpha, beta)
            if (evaluation < maxScore) {
                maxScore = evaluation
            }
            if (evaluation < beta) {
                beta = evaluation
            }
            if (beta <= alpha) {
                break
            }
        }
        return minScore
    }
}

function sortMoves(validmoves) {
    let sortedMoves = []
    let cornerMoves = []
    let sideMoves = []
    let nondesiredMoves = []
    const corners = [0,7,56,63]
    const sides = [2,3,4,5,16,23,24,31,32,39,40,47,58,59,60,61]
    const nondesired = [1,6,8,9,10,11,12,13,14,17,22,25,30,33,38,41,46,48,49,50,51,52,53,54,55,57,62]
    validmoves.forEach(sortMove => {
        if (corners.includes(sortMove)) {
            cornerMoves.push(sortMove)
        } else if (sides.includes(sortMove)) {
            sideMoves.push(sortMove)
        } else if (nondesired.includes(sortMove)) {
            nondesiredMoves.push(sortMove)
        } else {
            sortedMoves.push(sortMove)
        }
    })
    sortedMoves = sortedMoves.concat(nondesiredMoves)
    sortedMoves = sideMoves.concat(sortedMoves)
    sortedMoves = cornerMoves.concat(sortedMoves)
    return sortedMoves
}

window.makeMove = makeMove;