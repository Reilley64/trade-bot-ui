import 'sanitize.css';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTheme } from 'reilleykit';

import useStyles from './App.styles';
import Navigation from './Navigation';
import Home from './pages/Home';

const App = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.app} id="app">
      <Router>
        <Navigation />
        <div>
          <Route exact path="/">
            <Home />
          </Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
