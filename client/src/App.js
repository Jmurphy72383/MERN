import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Landing from './components/layout/Landing/Landing';
import Nasdaq from './pages/Nasdaq/Nasdaq';
import Nyse from './pages/Nyse/Nyse';
// import Portfolio from './pages/Portfolio/Portfolio';
import Portfolio1 from './pages/Portfolio/Portfolio1';
import './App.css';

function App() {

  

  return (
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/nasdaq" component={Nasdaq} />
            <Route exact path="/nyse" component={Nyse} />
            <Route exact path="/portfolio" component={Portfolio1} />
          </Switch>
        </Fragment>
      </Router>
  );
}

export default App;
