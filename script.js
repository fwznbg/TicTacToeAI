let humanPlayer = "";
let aiPlayer = "";
let isFull = false;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
// let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
/*
  Game pre-start
*/

const choose = document.querySelector(".choose");
const game = document.querySelector(".game");
const winner_statement = document.querySelector(".winner--container");
const winner = document.querySelector("#winner");
const chooseX = document.querySelector(".choose--x");
const chooseO = document.querySelector(".choose--o");
const resetButton = document.querySelector("#hidden--button");
const winnerReset = document.querySelector(".winner--button");

const check_board_complete = (board) => {
  let flag = true;
  board.forEach(element => {
    if (element != humanPlayer && element != aiPlayer) {
      flag = false;
    }
  });
   isFull = flag;
};

const check_line = (board, a, b, c) => {
  return (
    board[a] == board[b] &&
    board[b] == board[c] &&
    (board[a] == humanPlayer || board[a] == aiPlayer)
  );
};

const check_match = (board) => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(board, i, i + 1, i + 2)) {
      let match = {};
      match.winner = board[i];
      if(match.winner == humanPlayer) match.score = -10;
      else if (match.winner == aiPlayer) match.score = 10;
      return match;
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(board, i, i + 3, i + 6)) {
      let match = {};
      match.winner = board[i];
      if(match.winner == humanPlayer) match.score = -10;
      else if (match.winner == aiPlayer) match.score = 10;
      return match;
    }
  }
  if (check_line(board, 0, 4, 8)) {
    let match = {};
      match.winner = board[0];
      if(match.winner == humanPlayer) match.score = -10;
      else if (match.winner == aiPlayer) match.score = 10;
      return match;
  }
  if (check_line(board, 2, 4, 6)) {
    let match = {};
    match.winner = board[2];
    if(match.winner == humanPlayer) match.score = -10;
    else if (match.winner == ai) match.score = 10;
    return match;
  }
  return {
    winner: "",
    score: ""
  };
};

const check_for_winner = (board) => {
  let res = check_match(board)["winner"];
  if (res == humanPlayer) {
    winner.innerText = "You Win!";
    isFull = true
    winner_statement.style.visibility = "visible";
  } else if (res == aiPlayer) {
    winner.innerText = "Computer Win!";
    isFull = true
    winner_statement.style.visibility = "visible";
  } else if (isFull) {
    winner.innerText = "Draw!";
    winner_statement.style.visibility = "visible";
  }
};

const render_board = (board) => {
  game.innerHTML = ""
  board.forEach((e, i) => {
    // if(typeof(board[i]=="number")){
    //   game.innerHTML += `<div id="blok${i}" class="blok" onclick="humanMove(${i})"></div>`
    // }else{
    //   game.innerHTML += `<div id="blok${i}" class="blok" onclick="humanMove(${i})">${board[i]}</div>`
    // }
    game.innerHTML += `<div id="blok${i}" class="blok" onclick="humanMove(${i})">${board[i]}</div>`
    if (e == "X" || e == "O") {
      document.querySelector(`#blok${i}`).classList.add("occupied");
    }
  });
  winner_statement.style.visibility = "hidden";
};

const game_loop = (board) => {
  render_board(board);
  check_board_complete(board);
  check_for_winner(board);
}

// const RandomMove = () => {
//   if (!board_full) {
//     do {
//       selected = Math.floor(Math.random() * 9);
//     } while (board[selected] != "");
//     board[selected] = computer;
//     game_loop(board);
//   }
// }

const reset_board = (board) => {
  humanPlayer = "";
  aiPlayer = "";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  // gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  isFull = false;
  winner.innerText = "";
  render_board(board);
  choose.style.visibility = "visible";
  document.getElementById("hidden--button").style.visibility = "hidden";
};

resetButton.addEventListener("click", function(){
  humanPlayer = "";
  aiPlayer = "";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isFull = false;
  winner.innerText = "";
  render_board(gameBoard);
  choose.style.visibility = "visible";
  document.getElementById("hidden--button").style.visibility = "hidden";
});

winnerReset.addEventListener("click", function(){
  humanPlayer = "";
  aiPlayer = "";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isFull = false;
  winner.innerText = "";
  render_board(gameBoard);
  choose.style.visibility = "visible";
  document.getElementById("hidden--button").style.visibility = "hidden";
});




const x_button = () => {
  winner_statement.style.visibility = 'hidden';
  document.getElementById("hidden--button").style.visibility = "visible";
}

/* Game's move */

// const addPlayerMove = e => {
//   if (!board_full && board[e] == "" && player != "") {
//     board[e] = player;
//     game_loop(board);
//     addComputerMove();
//   }
// };

/*
const minimaxMove = (board, depth, isMax) => {
  let score = check_match()["score"];

  if(score == 10) return score;
  if(score == -10) return score;
  if(board_full) return 0;

  if(isMax){
    let bestMove = -10000;
    for(let i = 0; i<9;i++){
      if(board[i]==""){
        board[i] = computer;
        bestMove = Math.max(bestMove, minimaxMove(board, depth+1, !isMax));

        board[i] = "";
      }
    }
    return bestMove;
  }else{
    let bestMove = 100000;
    for(let i = 0; i<9;i++){
      if(board[i]==""){
        board[i] = player;
        bestMove = Math.min(bestMove, minimaxMove(board, depth+1, !isMax));

        board[i] = "";
      }
    }
    return bestMove;
  }
};

const findComputerMove = (board) => {
  let best = -100000;
  let bestMove = -1;

  for(let i = 0; i<9;i++){
    if(board[i]==""){
      board[i] = computer;
      let move = minimaxMove(board, 0, false);
      board[i] = "";
      
      if(move>best) {
        bestMove = i;
        best = move;
      }
    }
  }
  return bestMove;
}
*/

const emptyBoard = (board) => {
  return board.filter(b => b != "O" && b!= "X");
}

const minimax = (newBoard, currentPlayer) => {
  let availSpots = emptyBoard(newBoard);
  let score = check_match(newBoard)["score"];

  if(score == 10) return {score: 10};
  else if(score == -10) return {score: -10};
  else if(board_full) return {score: 0};

  let moves = [];
  for(let i=0; i<availSpots.length;i++){
    let move = {};
      // move.index = i;
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = currentPlayer;

    if(currentPlayer==computer){
      let result = minimax(newBoard, player);
      move.score = result.score;
    }else{
      let result = minimax(newBoard, computer);
      move.score = result.score;
    }
    // newBoard[i] = "";
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  if(currentPlayer === computer){
    let bestScore = -1000;
    for(let i=0; i<moves.length; i++){
      if(moves[i].score>bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{
    let bestScore = 1000;
    for(let i=0; i<moves.length; i++){
      if(moves[i].score<bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

const humanMove = (e) => {
  if (!isFull && gameBoard[e] == "" && humanPlayer != "") {
    gameBoard[e] = humanPlayer;
    game_loop(gameBoard);
    aiMove();
  }
};

const aiMove = () => {
  if (!isFull) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (gameBoard[selected] != "");
    gameBoard[selected] = aiPlayer;
    // let idx = minimax(board, computer).index;
    // board[idx] = computer;
    game_loop(gameBoard);
  }
}

// const choose_side = (side) => {
//   if(side == "X"){
    
//   }else{
    
//   }
// }


chooseX.addEventListener("click", function(){
  humanPlayer = "X";
  aiPlayer = "O";
  choose.style.visibility = "hidden";
});
chooseO.addEventListener("click", function(){
  humanPlayer = "O";
    aiPlayer = "X";
    choose.style.visibility = "hidden";
    aiMove();
  });
    

// render
render_board(gameBoard);
