import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Minesweeper from '../utils/minesweeper';
import { changeLevel, setTime, startTime } from '../actions';
import '../assets/styles/components/MenuGame.scss';
import clockIcon from '../assets/static/clock.svg';
import flagIcon from '../assets/static/flag.svg';
import logo from '../assets/static/logo.png';

const MenuGame = (props) => {
  const { bombsPending, level, start } = props;

  const [menuState, setState] = useState({
    h: 0,
    m: 0,
    s: 0,
    time: '00:00:00',
    init: false,
    idInterval: 0,
  });

  useEffect(() => {
    if (!menuState.init && start) {
      startCronometer();
    }

    if (menuState.init && !start) {
      stopCronometer();
    }
  });

  const cronometro = () => {
    let { s, m, h, time } = menuState;
    let hAux,
      mAux,
      sAux;

    s++;
    if (s > 59) {
      m++;
      s = 0;
    }
    if (m > 59) {
      h++;
      m = 0;
    }
    if (h > 24) {
      h = 0;
    }

    if (s < 10) {
      sAux = `0${s}`;
    } else {
      sAux = s;
    }
    if (m < 10) {
      mAux = `0${m}`;
    } else {
      mAux = m;
    }
    if (h < 10) {
      hAux = `0${h}`;
    } else {
      hAux = h;
    }
    time = `${hAux}:${mAux}:${sAux}`;

    menuState.s = s;
    menuState.m = m;
    menuState.h = h;

    setState({
      ...menuState,
      time,
    });
  };

  const startCronometer = () => {
    const idInterval = setInterval(cronometro, 1000);
    menuState.init = true;
    menuState.idInterval = idInterval;
  };

  const stopCronometer = () => {
    clearInterval(menuState.idInterval);
    props.setTime(menuState.time);
    setState({
      ...menuState,
      time: '00:00:00',
      s: 0,
      m: 0,
      h: 0,
      init: false,
    });
  };

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
      <img src={logo} alt='Logo' />

      <div className='menu-item'>
        <img src={clockIcon} alt='Clock' />
        <span>{menuState.time}</span>
      </div>

      <div className='menu-item'>
        <img src={flagIcon} alt='Clock' />
        <span>{bombsPending}</span>
      </div>

      <h3>Nivel</h3>

      <div className='menu-levels'>
        <div
          role='button'
          tabIndex='0'
          name='1'
          className={`level-option ${level === 0 ? 'active' : ''}`}
          onClick={() => handleLevel(0)}
        >
          1
        </div>
        <div
          role='button'
          tabIndex='0'
          name='2'
          className={`level-option ${level === 1 ? 'active' : ''}`}
          onClick={() => handleLevel(1)}
        >
          2
        </div>
        <div
          role='button'
          tabIndex='0'
          name='3'
          className={`level-option ${level === 2 ? 'active' : ''}`}
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
    level: state.selectedLevel,
    start: state.start,
  };
};

const mapDispatchToProps = {
  changeLevel,
  setTime,
  startTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuGame);
