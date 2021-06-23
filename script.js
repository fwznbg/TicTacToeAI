let humanPlayer = "";
let aiPlayer = "";
let isFull = false;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
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
  return isFull;
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
      // let match = {};
      // match.winner = board[i];
      // if(match.winner == humanPlayer) match.score = -10;
      // else if (match.winner == aiPlayer) match.score = 10;
      // return match;
      return board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(board, i, i + 3, i + 6)) {
      // let match = {};
      // match.winner = board[i];
      // if(match.winner == humanPlayer) match.score = -10;
      // else if (match.winner == aiPlayer) match.score = 10;
      // return match;
      return board[i];
    }
  }
  if (check_line(board, 0, 4, 8)) {
    // let match = {};
    //   match.winner = board[0];
    //   if(match.winner == humanPlayer) match.score = -10;
    //   else if (match.winner == aiPlayer) match.score = 10;
    //   return match;
    return board[0];
  }
  if (check_line(board, 2, 4, 6)) {
    // let match = {};
    // match.winner = board[2];
    // if(match.winner == humanPlayer) match.score = -10;
    // else if (match.winner == aiPlayer) match.score = 10;
    // return match;
    return board[2];
  }
  // if(check_board_complete(board)){
  //   // return {
  //   //   winner:"",
  //   //   score: 0
  //   // }
  //   return 0;
  // }
  return "";
};

const check_for_winner = (board) => {
  let res = check_match(board);
  if (res == humanPlayer) {
    winner.innerText = "You Win!";
    isFull = true
    winner_statement.style.visibility = "visible";
  } else if (res == aiPlayer) {
    winner.innerText = "Computer Win!";
    isFull = true
    winner_statement.style.visibility = "visible";
  } else if (check_board_complete(board)) {
    winner.innerText = "Draw!";
    winner_statement.style.visibility = "visible";
  }
};

const render_board = (board) => {
  game.innerHTML = ""
  board.forEach((e, i) => {
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

const reset_board = (board) => {
  humanPlayer = "";
  aiPlayer = "";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
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

// const emptyBoard = (board) => {
//   return board.filter(b => b != "O" && b!= "X");
// }

const minimax = (board, depth, isMaximizing) => {
  let winner = check_match(board);
  if (winner !== "") {
    // return result.score;
    if(winner == aiPlayer) return 10-depth;
    else if (winner == humanPlayer) return depth-10;
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] == "") {
        board[i] = aiPlayer;
        let score = minimax(board, depth + 1, !isMaximizing);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] == "") {
        board[i] = humanPlayer;
        let score = minimax(board, depth + 1, isMaximizing);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

const bestMove = () => {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
      // Is the spot available?
    if (gameBoard[i] == "") {
      gameBoard[i] = aiPlayer;
      let score = minimax(gameBoard, 0, false);
      gameBoard[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  gameBoard[move] = aiPlayer;
  // currentPlayer = human;
}

const humanMove = (e) => {
  if (!isFull && gameBoard[e] == "" && humanPlayer != "") {
    gameBoard[e] = humanPlayer;
    game_loop(gameBoard);
    aiMove();
  }
};

const aiMove = () => {
  // if (!isFull) {
  //   do {
  //     selected = Math.floor(Math.random() * 9);
  //   } while (gameBoard[selected] != "");
  //   gameBoard[selected] = aiPlayer;
    // let idx = minimax(board, computer).index;
    // board[idx] = computer;
    bestMove();
    game_loop(gameBoard);
}


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
