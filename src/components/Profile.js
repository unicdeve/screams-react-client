import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import { uploadImage, logoutUser } from '../redux/actions/userActions';
import MyButton from '../util/MyButton';

const styles = theme => ({
  ...theme
});

function Profile(props) {
  const {
    classes,
    user: {
      authenticated,
      credentials: { handle, createdAt, imageUrl, bio, website, location },
      loading
    },
    uploadImage,
    logout
  } = props;

  const handleImageChange = e => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = () => logout();

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='Profile' className='profile-image' />
            <input
              type='file'
              id='imageInput'
              hidden='hidden'
              onChange={handleImageChange}
            />

            <MyButton
              tip='Edit profile image'
              onClick={handleEditPicture}
              btnClassName='button'
            >
              <EditIcon color='primary' />
            </MyButton>
          </div>
          <hr />

          <div className='profile-details'>
            <MuiLink component={Link} to={`/users/${handle}`} variant='h5'>
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color='primary' /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
              </>
            )}
            <CalendarToday color='primary' />{' '}
            <span>Joined {dayjs(createdAt).format('MM YYYY')}</span>
          </div>

          <MyButton tip='Logout' onClick={handleLogout}>
            <KeyboardReturn color='primary' />
          </MyButton>

          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No profile found, please sign in.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/login'
          >
            Login
          </Button>

          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/login'
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading</p>
  );

  return profileMarkup;
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  logout: logoutUser,
  uploadImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
