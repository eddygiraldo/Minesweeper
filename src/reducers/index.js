import Minesweeper from '../utils/minesweeper';

const initialState = {
  popUp: {
    visible: true,
    title: 'Bienvenido',
    content: 'A Minesweeper!',
    winner: true,
    textButton: 'Iniciar juego',
  },
  selectedLevel: 0,
  minesweeper: {},
  changeState: 0,
};

const minesweeper = new Minesweeper(initialState.selectedLevel);
minesweeper.startGame();
initialState.minesweeper = minesweeper;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        minesweeper: action.payload,
      };
    case 'CHANGE_LEVEL':
      return {
        ...state,
        minesweeper: action.payload.minesweeper,
        selectedLevel: action.payload.selectedLevel,
      };
    case 'SET_ITEM_VISIBLE':
      return {
        ...state,
        minesweeper: action.payload.minesweeper,
      };
    case 'SET_GAME_STATE':
      return {
        ...state,
        minesweeper: action.payload,
        changeState: state.changeState + 1,
      };
    case 'SHOW_POPUP':
      return {
        ...state,
        popUp: {
          title: action.payload.title,
          content: action.payload.content,
          winner: action.payload.winner,
          textButton: action.payload.textButton,
          visible: !state.popUp.visible,
        },
      };
    case 'CLOSE_POPUP':
      return {
        ...state,
        popUp: {
          ...state.popUp,
          visible: !state.popUp.visible,
        },
      };
    default:
      return state;
  }
};

export default reducer;
