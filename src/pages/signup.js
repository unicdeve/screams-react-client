import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppLogo from '../images/logo.png';
import { signupUser } from '../redux/actions/userActions';

const styles = theme => ({
  ...theme
});

function SignUp({ classes, history, signUp, UI: { loading, errors } }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: ''
  });

  const { email, password, handle, confirmPassword } = values;

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    signUp(values, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img scr={AppLogo} width={30} alt='monkey' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Sign up
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='handle'
            name='handle'
            type='text'
            label='Handle'
            helperText={errors.handle}
            error={errors.handle ? true : false}
            fullWidth
            className={classes.textField}
            value={handle}
            onChange={handleChange}
          />

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

          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            fullWidth
            className={classes.textField}
            value={confirmPassword}
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
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapDispatchToProps = dispatch => ({
  signUp: (userData, history) => dispatch(signupUser(userData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUp));
