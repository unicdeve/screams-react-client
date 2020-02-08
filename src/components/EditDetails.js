import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

import { editUserDetails } from '../redux/actions/userActions';
import MyButton from '../util/MyButton';

const styles = theme => ({
  ...theme,
  button: {
    float: 'right'
  }
});

function EditDetails(props) {
  const { credentials, classes, editUser } = props;

  const [values, setValues] = useState({
    bio: '',
    website: '',
    location: ''
  });

  const { bio, website, location } = values;

  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = cred => {
    setValues({
      bio: cred.bio ? cred.bio : '',
      website: cred.website ? cred.website : '',
      location: cred.location ? cred.location : ''
    });
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => setOpen(false);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    editUser(values);
    handleClose();
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  return (
    <>
      <MyButton
        tip='Edit details'
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color='primary' />
      </MyButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id='bio'
              name='bio'
              type='text'
              label='Bio'
              fullWidth
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={bio}
              onChange={handleChange}
            />

            <TextField
              id='website'
              name='website'
              type='text'
              label='Website'
              fullWidth
              placeholder='Your personal/professional website'
              className={classes.textField}
              value={website}
              onChange={handleChange}
            />

            <TextField
              id='location'
              name='location'
              type='text'
              label='Location'
              fullWidth
              placeholder='Where do you live?'
              className={classes.textField}
              value={location}
              onChange={handleChange}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>

          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDetails.propTypes = {
  editUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUser: editUserDetails })(
  withStyles(styles)(EditDetails)
);
