import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
}

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
