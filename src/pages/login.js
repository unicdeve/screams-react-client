import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppLogo from '../images/logo.png';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
};

function Login({ classes, history }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    loading: false,
    errors: {}
  });

  const { email, password, loading, errors } = values;

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setValues({ ...values, loading: true });

    axios
      .post('/login', { email, password })
      .then(res => {
        setValues({ ...values, loading: false });
        history.push('/');
      })
      .catch(err => {
        setValues({ ...values, errors: err.response.data, loading: false });
      });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img scr={AppLogo} width={30} alt='monkey' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            helperText={errors.email}
            error={errors.email ? true : false}
            fullWidth
            className={classes.textField}
            value={email}
            onChange={handleChange}
          />

          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
            className={classes.textField}
            value={password}
            onChange={handleChange}
          />

          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
