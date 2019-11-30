import clickAudio from '../assets/static/click.mp3';
import bombAudio from '../assets/static/bomb.mp3';
import flagAudio from '../assets/static/flag.mp3';
import winnerAudio from '../assets/static/winner.mp3';
import { setTime } from '../actions';

class Minesweeper {
  constructor(level) {

    this.board = [];
    this.correct = 0;
    this.flags = 0;
    this.bombsPending = 0;
    this.goal = 0;

    this.levels = [
      {
        id: 1,
        description: 'Básico',
        rows: 10,
        columns: 8,
        bombs: 10,
        squareWidth: '80px',
        squareText: '30px',
      },
      {
        id: 2,
        description: 'Intermedio',
        rows: 18,
        columns: 14,
        bombs: 40,
        squareWidth: '40px',
        squareText: '20px',
      },
      {
        id: 3,
        description: 'Díficil',
        rows: 24,
        columns: 20,
        bombs: 99,
        squareWidth: '32px',
        squareText: '15px',
      },
    ];

    this.level = this.levels[level];
  }

  // eslint-disable-next-line class-methods-use-this
  playBomb() {
    const audioBomb = new Audio('../assets/static/bomb.mp3');
    audioBomb.play();
  }

  // eslint-disable-next-line class-methods-use-this
  playClick() {
    const audioClick = new Audio('../assets/static/click.mp3');
    audioClick.play();
  }

  // eslint-disable-next-line class-methods-use-this
  playFlag() {
    const audioFlag = new Audio('../assets/static/flag.mp3');
    audioFlag.play();
  }

  // eslint-disable-next-line class-methods-use-this
  playWinner() {
    const audioWinner = new Audio('../assets/static/winner.mp3');
    audioWinner.play();
  }

  createBoard() {
    let counter = 0;
    let colorFlag = false;
    for (let i = 0; i < this.level.rows; i++) {
      const row = {
        id: i,
        childrens: [],
      };

      colorFlag = !colorFlag;

      for (let j = 0; j < this.level.columns; j++) {
        row.childrens.push({
          i,
          j,
          id: counter,
          bomb: false,
          dark: colorFlag,
          visible: false,
          flag: false,
          bombsAround: 0,
        });
        counter++;
        colorFlag = !colorFlag;
      }

      this.board.push(row);
    }
  };

  addBombs() {
    let finish = 0;
    while (finish < this.level.bombs) {
      const randomRow = getRandomNumber(this.level.rows);
      const randomColumn = getRandomNumber(this.level.columns);
      if (!this.board[randomRow].childrens[randomColumn].bomb) {
        this.board[randomRow].childrens[randomColumn].bomb = true;
        finish++;
      }
    }
  };

  calculateBombs() {
    let minParent = 0;
    let maxParent = 0;
    let minChildren = 0;
    let maxChildren = 0;

    for (let i = 0; i < this.level.rows; i++) {
      minParent = i === 0 ? i : i - 1;
      maxParent = i === this.level.rows - 1 ? i : i + 1;

      for (let j = 0; j < this.level.columns; j++) {
        minChildren = j === 0 ? j : j - 1;
        maxChildren = j === this.level.columns - 1 ? j : j + 1;
        let bombs = 0;

        for (let l = minParent; l <= maxParent; l++) {
          for (let m = minChildren; m <= maxChildren; m++) {
            if (this.board[l].childrens[m].bomb) {
              bombs++;
            }
          }
        }
        this.board[i].childrens[j].bombsAround = bombs;
      }
    }
  };

  startGame() {
    this.createBoard();
    this.addBombs();
    this.calculateBombs();
    this.bombsPending = this.level.bombs - this.flags;
    this.goal = (this.level.rows * this.level.columns) - this.level.bombs;
  }

  getElementsAround(i, j) {
    const around = {
      minParent: i === 0 ? i : i - 1,
      maxParent: i === (this.level.rows - 1) ? i : i + 1,
      minChildren: j === 0 ? j : j - 1,
      maxChildren: j === (this.level.columns - 1) ? j : j + 1,
    };

    return around;
  };

  setItemVisible(item) {

    if (item.bomb) {
      this.playBomb();
    } else {
      this.playClick();
      this.correct++;
    }

    this.board[item.i].childrens[item.j] = ({
      ...item,
      visible: true,
    });
  };

  setFlagItem(item) {
    if (!item.visible) {
      if (!item.flag) {
        this.flags++;
        this.bombsPending--;
      } else {
        this.flags--;
        this.bombsPending++;
      }

      this.board[item.i].childrens[item.j] = ({
        ...item,
        flag: !item.flag,
      });

      this.playFlag();
    }
  };
}

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max));
};

export default Minesweeper;
