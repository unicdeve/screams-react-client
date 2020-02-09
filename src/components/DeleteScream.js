import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import MyButton from '../util/MyButton';
import { deleteScream } from '../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

function DeleteScream(props) {
  const [open, setOpen] = React.useState(false);

  const { classes, screamId } = props;

  const deleteThisScream = () => {
    props.deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <MyButton
        tip='Delete Scream'
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color='secondary' />
      </MyButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Are you sure you want to delete this scream</DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            Cancel
          </Button>

          <Button onClick={deleteThisScream} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
