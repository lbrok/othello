function makeMove (array, player, validMoves, turn) {
    let bestMove = 0
    let bestScore = 0
    if (validMoves.length != 0) {
    validMoves.forEach(move => {
            simulatedarray = simulateMove(array, player, move)
            simulatedscore = evaluateMove(simulatedarray, player)
            if (simulatedscore > bestScore){
                bestMove = move
                bestScore = simulatedscore
            }    
        })
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
function evaluateMove (simulatedarray, player) {
    let score = 0
    simulatedarray.forEach(disk => {
        if (disk == player) {
            score = score + 1
        }
    })
    return score
}
window.makeMove = makeMove;