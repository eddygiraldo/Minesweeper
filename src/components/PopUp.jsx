import React from 'react';
import { connect } from 'react-redux';
import Minesweeper from '../utils/minesweeper';
import { closePopUp, startGame, startTime } from '../actions';
import clockIcon from '../assets/static/clock.svg';
import '../assets/styles/components/PopUp.scss';

const PopUp = (props) => {
  const { title, content, textButton, winner } = props.popUp;
  const { level } = props;
  const { time } = props;

  const handleClose = () => {
    props.closePopUp();
  };

  const handleRestart = () => {
    const minesweeper = new Minesweeper(level);
    minesweeper.startGame();
    props.startGame(minesweeper);
    props.startTime(true);
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

          {
            winner && (
              <div className='time'>
                <img src={clockIcon} alt='Clock' />
                <span>{time}</span>
              </div>
            )
          }

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
  startTime,
};

export default connect(null, mapDispatchToProps)(PopUp);
