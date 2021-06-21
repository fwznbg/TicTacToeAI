let player = "";
let computer = "";
let board_full = false;
let board = ["", "", "", "", "", "", "", "", ""];
// let iter = 0;
// let round = 0;  
/*
  Game pre-start
*/

const choose = document.querySelector(".choose");

const choose_side = (side) => {
  if(side == "X"){
    player = "X";
    computer = "O";
  }else{
    player = "O";
    computer = "X";
    addComputerMove();
  }
  choose.style.visibility = "hidden";	
}


let board_full = false;
let board = ["", "", "", "", "", "", "", "", ""];

const game = document.querySelector(".game");

const winner_statement = document.querySelector(".winner--container");

check_board_complete = () => {
  let flag = true;
  board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

const check_line = (a, b, c) => {
  return (
    board[a] == board[b] &&
    board[b] == board[c] &&
    (board[a] == player || board[a] == computer)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      let match = {};
      match.winner = board[i];
      if(match.winner == player) match.score = -10;
      else if (match.winner == computer) match.score = 10;
      return match;
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      let match = {};
      match.winner = board[i];
      if(match.winner == player) match.score = -10;
      else if (match.winner == computer) match.score = 10;
      return match;
    }
  }
  if (check_line(0, 4, 8)) {
    let match = {};
      match.winner = board[0];
      if(match.winner == player) match.score = -10;
      else if (match.winner == computer) match.score = 10;
      return match;
  }
  if (check_line(2, 4, 6)) {
    let match = {};
    match.winner = board[2];
    if(match.winner == player) match.score = -10;
    else if (match.winner == computer) match.score = 10;
    return match;
  }
  return {
    winner: "",
    score: ""
  };
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    winner.innerText = "You Win!";
    board_full = true
    winner_statement.style.visibility = "visible";
  } else if (res == computer) {
    winner.innerText = "Computer Win!";
    board_full = true
    winner_statement.style.visibility = "visible";
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner_statement.style.visibility = "visible";
  }
};

const render_board = () => {
  game.innerHTML = ""
  board.forEach((e, i) => {
    game.innerHTML += `<div id="blok${i}" class="blok" onclick="addPlayerMove(${i})">${board[i]}</div>`
    if (e == "X" || e == "O") {
      document.querySelector(`#blok${i}`).classList.add("occupied");
    }
  });
  winner_statement.style.visibility = "hidden";
};

const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
}

const addPlayerMove = e => {
  if (!board_full && board[e] == "" && player != "") {
    board[e] = player;
    game_loop();
    addComputerMove(false);
  }
};

const addComputerMove = (isSmart) => {
  isSmart? SmartMove() : RandomMove();
};

const RandomMove = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (board[selected] != "");
    board[selected] = computer;
    game_loop();
  }
}

const SmartMove = () => {

}

const reset_board = () => {
  player = "";
  computer = "";
  board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.innerText = "";
  render_board();
  choose.style.visibility = "visible";
  document.getElementById("hidden--button").style.visibility = "hidden";
};

const x_button = () => {
  winner_statement.style.visibility = 'hidden';
  document.getElementById("hidden--button").style.visibility = "visible";
}

/* Game's move */

const addPlayerMove = e => {
  if (!board_full && board[e] == "" && player != "") {
    board[e] = player;
    game_loop();
    addComputerMove();
  }
};

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

const minimax = (newBoard, currentPlayer) => {
  let score = check_match()["score"];

  if(score == 10) return {score: 10};
  else if(score == -10) return {score: -10};
  else if(board_full) return {score: 0};

  let moves = [];
  for(let i=0; i<newBoard.length;i++){
    if(newBoard[i]==""){
      let move = {};
      // move.index = i;
      move.index = newBoard[i];
      newBoard[i] = currentPlayer;

      if(currentPlayer==computer){
        let result = minimax(newBoard, player);
        move.score = result.score;
      }else{
        let result = minimax(newBoard, computer);
        move.score = result.score;
      }
      // newBoard[i] = "";
      newBoard[i] = move.index;
      moves.push(move);
    }
  }

  let bestMove;
  if(currentPlayer === computer){
    let bestScore = -100000;
    for(let i=0; i<moves.length; i++){
      if(moves[i].score>bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{
    let bestScore = 100000;
    for(let i=0; i<moves.length; i++){
      if(moves[i].score<bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

const addComputerMove = () => {
  if (!board_full) {
    // do {
    //   selected = Math.floor(Math.random() * 9);
    // } while (board[selected] != "");
    // board[selected] = computer;
    let idx = minimax(board, computer).index;
    board[idx] = computer;
    game_loop();
  }
}

// render
render_board();
