import React from 'react';
import { connect } from 'react-redux';
import PopUp from '../components/PopUp';
import '../assets/styles/App.scss';

const Layout = (props) => {
  const { children, popUp, selectedLevel, time } = props;
  return (
    <>
      <div className='app'>
        {children}
      </div>
      {
        popUp.visible && (
          <PopUp
            popUp={popUp}
            level={selectedLevel}
            time={time}
          />
        )
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    popUp: state.popUp,
    selectedLevel: state.selectedLevel,
    time: state.time,
  };
};

export default connect(mapStateToProps, null)(Layout);
