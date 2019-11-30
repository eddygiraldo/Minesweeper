import React from 'react';
import { connect } from 'react-redux';
import Minesweeper from '../utils/minesweeper';
import { changeLevel } from '../actions';
import '../assets/styles/components/MenuGame.scss';
import clockIcon from '../assets/static/clock.svg';
import flagIcon from '../assets/static/flag.svg';

const MenuGame = (props) => {
  const { time, bombsPending } = props;

  const handleLevel = (level) => {
    const minesweeper = new Minesweeper(level);
    minesweeper.startGame();
    props.changeLevel({
      minesweeper,
      selectedLevel: level,
    });
  };

  return (
    <div className='menu-game'>

      <div className='menu-item'>
        <img src={clockIcon} alt='Clock' />
        <span>{time}</span>
      </div>

      <div className='menu-item'>
        <img src={flagIcon} alt='Clock' />
        <span>{bombsPending}</span>
      </div>

      <div className='menu-levels'>
        <div
          role='button'
          tabIndex='0'
          name='1'
          className='level-option'
          onClick={() => handleLevel(0)}
        >
          1
        </div>
        <div
          role='button'
          tabIndex='0'
          name='2'
          className='level-option'
          onClick={() => handleLevel(1)}
        >
          2
        </div>
        <div
          role='button'
          tabIndex='0'
          name='3'
          className='level-option'
          onClick={() => handleLevel(2)}
        >
          3
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bombsPending: state.minesweeper.bombsPending,
    time: state.minesweeper.time,
  }
}

const mapDispatchToProps = {
  changeLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuGame);
