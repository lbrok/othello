# Othello

### About the game
Othello, also known as Reversi, is a strategy board game where two players take turns placing disks on a 8x8 board. Disks are game pieces with one light side and one dark side. During a play, any disks of the opponent's color that are in a straight line and bounded by the disk just placed and another disk of the current player's color are turned over to the current player's color. The player with most disks in one's color wins when there are no possible moves left.

### Setup
To download the required files run:
```
git clone https://github.com/lbrok/othello
```
Run index.html in your internet browser. You are then assigned a color and the game starts.

![](https://github.com/lbrok/othello/blob/main/Othello-gif.gif)

### About the project
- The game is run client side using JavaScript.
- The AI is implemented using a minimax algorithm and optimised using alpha-beta pruning. To optimise the pruning even further the moves are sorted based on where on the board the disk is placed. Having good moves sorted first leads to more branches being pruned.
- The evaluation function is based on where the player controls disks. Disks in corners can not be flipped and are stable, owning the edges are beneficial to control the game, any disks next to corners are bad since they can allow the opposing player to gain control of the corner.
- Further work can be done to the AI allowing it to control the game better. Iterative deepening could allow for more pruning allowing the minimax algorithm to go deeper. A bitmap would optimise the representation of the game.
