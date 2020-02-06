import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
