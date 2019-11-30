export const startGame = (payload) => ({
  type: 'START_GAME',
  payload,
});

export const changeLevel = (payload) => ({
  type: 'CHANGE_LEVEL',
  payload,
});

export const setGameState = (payload) => ({
  type: 'SET_GAME_STATE',
  payload,
});

export const showPopUp = (payload) => ({
  type: 'SHOW_POPUP',
  payload,
});

export const setWinner = (minesweeper) => {
  return (dispatch) => {
    minesweeper.playWinner();
    dispatch(showPopUp({
      title: 'Felicidades',
      content: 'Has ganado!',
      winner: true,
      textButton: 'Volver a jugar',
    }));
  };
};

export const setLoser = (minesweeper) => {
  return (dispatch) => {
    let delay = 0;
    const { level, board } = minesweeper;
    const delayFactor = 1500 / level.bombs;
    for (let i = 0; i < level.rows; i++) {
      for (let j = 0; j < level.columns; j++) {
        const item = board[i].childrens[j];
        if (!item.visible && item.bomb && !item.flag) {
          delay += delayFactor;
          setTimeout(() => {
            minesweeper.setItemVisible(item);
            dispatch(setGameState(minesweeper));
          }, 500 + delay);
        }
      }
    }

    setTimeout(() => {
      dispatch(showPopUp({
        title: 'Lo Sentimos',
        content: 'Has perdido!',
        winner: false,
        textButton: 'Volver a intentarlo',
      }));
    }, 500 + delay);
  };
};

export const setItemVisible = (minesweeper, item) => {
  return (dispatch) => {
    if (item.bomb) {
      dispatch(setLoser(minesweeper));
    }

    minesweeper.setItemVisible(item);

    if (minesweeper.correct === minesweeper.goal) {
      dispatch(setWinner(minesweeper));
    }

    dispatch(setGameState(minesweeper));
  };
};

export const setFlagItem = (minesweeper, item) => {
  return (dispatch) => {
    minesweeper.setFlagItem(item);
    dispatch(setGameState(minesweeper));
  };
};

export const closePopUp = (payload) => ({
  type: 'CLOSE_POPUP',
  payload,
});
