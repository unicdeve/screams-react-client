import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Mui imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme
});

function CommentForm(props) {
  const {
    classes,
    authenticated,
    screamId,
    UI: { loading, errors: validationErrors }
  } = props;

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setErrors({});
    setBody(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.submitComment(screamId, { body });
  };

  useEffect(() => {
    if (validationErrors) setErrors(validationErrors);

    if (!validationErrors.comment && !loading) {
      setBody('');
    }
  }, [validationErrors, loading]);

  const commentFormMarkup = authenticated && (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id='body'
          name='body'
          type='text'
          label='Comment'
          fullWidth
          error={errors.comment ? true : false}
          helperText={errors.comment}
          className={classes.textField}
          value={body}
          onChange={handleChange}
        />

        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          type='submit'
        >
          Submit
          {loading && <CircularProgress />}
        </Button>
      </form>
      <hr className={classes.visibleSeperator} />
    </Grid>
  );
  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
