import React from 'react';
import { connect } from 'react-redux';
import { showPopUp, setFlagItem, setItemVisible } from '../actions';
import '../assets/styles/components/Board.scss';
import bombIcon from '../assets/static/bomb.svg';
import flagIcon from '../assets/static/flag.svg';

const Board = (props) => {
  const { minesweeper } = props;
  const { board, level } = minesweeper;

  const getItemStyles = (item) => {
    return `${'board-element'} ${
      item.dark ? 'dark' : 'light'} ${
      item.bomb && item.visible ? 'bomb' : ''} ${
      item.visible ? 'visible' : ''}`;
  };

  const setVisibleItems = (item) => {
    if (!item.visible && !item.flag) {
      props.setItemVisible(minesweeper, item);
      if (item.bombsAround === 0) {
        const around = minesweeper.getElementsAround(item.i, item.j);
        for (let l = around.minParent; l <= around.maxParent; l++) {
          for (let m = around.minChildren; m <= around.maxChildren; m++) {
            setVisibleItems(board[l].childrens[m]);
          }
        }
      }
    }
  };

  const handleOutClick = () => {
    const elements = document.getElementsByClassName('hover');
    Array.from(elements).forEach((element) => {
      element.classList.remove('hover');
    });
  };

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  const showAround = (item) => {
    if (item.visible) {
      const around = minesweeper.getElementsAround(item.i, item.j);
      let flagsAround = 0;
      for (let l = around.minParent; l <= around.maxParent; l++) {
        for (let m = around.minChildren; m <= around.maxChildren; m++) {
          const children = board[l].childrens[m];
          if (children.flag) {
            flagsAround++;
          }
          if (!children.visible && !children.flag) {
            const element = document.getElementById(children.id);
            element.classList.add('hover');
          }
        }
      }
      if (item.bombsAround === flagsAround) {
        for (let l = around.minParent; l <= around.maxParent; l++) {
          for (let m = around.minChildren; m <= around.maxChildren; m++) {
            const children = board[l].childrens[m];
            if (!children.flag && !children.visible) {
              setVisibleItems(children);
            }
          }
        }
      }
    }
  };

  const handleClick = (event, item) => {
    switch (event.which) {
      case 1:
        setVisibleItems(item);
        break;
      case 2:
        showAround(item);
        break;
      case 3:
        props.setFlagItem(minesweeper, item);
        break;
      default:
        break;
    }
  };

  return (
    <div className='board'>
      {
        board.map((row) => (
          <div key={row.id} className='board-row'>
            {
              row.childrens.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className={getItemStyles(item)}
                  onMouseDown={() => handleClick(event, item)}
                  onMouseUp={() => handleOutClick()}
                  role='button'
                  tabIndex='0'
                  style={{ width: level.squareWidth, height: level.squareWidth }}
                >
                  {
                    item.visible && item.bombsAround > 0 && !item.bomb && (
                      <p
                        name={item.bombsAround}
                        style={{ fontSize: level.squareText }}
                      >
                        {item.bombsAround}
                      </p>
                    )
                  }
                  {
                    item.visible && item.bomb && (
                      <img src={bombIcon} alt='Bomb' />
                    )
                  }
                  {
                    item.flag && (
                      <img src={flagIcon} alt='Flag' />
                    )
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    minesweeper: state.minesweeper,
    changeState: state.changeState,
  };
};

const mapDispatchToProps = {
  showPopUp,
  setFlagItem,
  setItemVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
