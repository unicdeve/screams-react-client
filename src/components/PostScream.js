import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { postScream, clearErrors } from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';

const styles = theme => ({
  ...theme,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
});

function PostScream(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const {
    classes,
    UI: { loading, errors: validationErrors }
  } = props;

  const handleClose = () => {
    props.clearErrors();
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.postScream({ body });
  };

  const handleChange = e => {
    setErrors({});
    setBody(e.target.value);
  };

  useEffect(() => {
    if (validationErrors) setErrors(validationErrors);

    if (!validationErrors.body && !loading) {
      setOpen(false);
      setBody('');
    }
  }, [validationErrors, loading]);

  return (
    <>
      <MyButton tip='Post a Scream!' onClick={() => setOpen(true)}>
        <AddIcon />
      </MyButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              id='body'
              name='body'
              type='text'
              label='SCREAM!'
              fullWidth
              multiline
              rows='3'
              error={errors.body ? true : false}
              helperText={errors.body}
              placeholder='Scream at your fellow apes...'
              className={classes.textField}
              value={body}
              onChange={handleChange}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={loading}
            >
              Post
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
