import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../containers/Layout';
import Home from '../components/Home';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default App;
