import React from 'react';
import { connect } from 'react-redux';
import Minesweeper from '../utils/minesweeper';
import { closePopUp, startGame } from '../actions';
import '../assets/styles/components/PopUp.scss';

const PopUp = (props) => {
  const { title, content, textButton } = props.popUp;
  const { level } = props;

  const handleClose = () => {
    props.closePopUp();
  };

  const handleRestart = () => {
    const minesweeper = new Minesweeper(level);
    minesweeper.startGame();
    props.startGame(minesweeper);
    props.closePopUp();
  };

  return (
    <div className='popup'>
      <div className='popup-container'>
        <button
          type='button'
          onClick={handleClose}
          className='close-button'
        >
          X
        </button>

        <div className='popup-contain'>
          <h1>
            {title}
          </h1>

          <p>{content}</p>

          <button
            className='btn'
            action='btn'
            type='button'
            onClick={() => handleRestart()}
          >
            {textButton}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  closePopUp,
  startGame,
};

export default connect(null, mapDispatchToProps)(PopUp);
