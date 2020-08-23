import 'sanitize.css';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTheme } from 'reilleykit';

import useStyles from './App.styles';
import Navigation from './Navigation';
import Orders from './pages/Orders';
import NewTransaction from './pages/Transactions/New/NewTransaction';
import Transactions from './pages/Transactions/Transactions';

const App = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.app} id={'app'}>
      <Router basename={process.env.PUBLIC_URL}>
        <Navigation/>
        <div>
          <Route exact path={'/orders'}>
            <Orders/>
          </Route>
          <Route exact path={'/transactions/new'}>
            <NewTransaction/>
          </Route>
          <Route exact path={'/transactions'}>
            <Transactions/>
          </Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
