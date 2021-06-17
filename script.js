let player = "";
let computer = "";

const choose = document.querySelector(".choose");

const choose_side = (side) => {
  if(side == "X"){
    player = "X";
    computer = "O";
  }else{
    player = "O";
    computer = "X";
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
      return board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      return board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    return board[0];
  }
  if (check_line(2, 4, 6)) {
    return board[2];
  }
  return "";
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

//initial render
render_board();
