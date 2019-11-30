import React from 'react';
import Board from './Board';
import MenuGame from './MenuGame';
import '../assets/styles/components/Home.scss';

const Home = () => (
  <div className='container'>
    <MenuGame />
    <Board />
  </div>
);

export default Home;
