import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';

import HomePage from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Navbar from './components/Navbar';

import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import store from './redux/store';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <AuthRoute
                exact
                path='/login'
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path='/signup'
                component={SignUp}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
