import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import MyButton from '../../util/MyButton';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

function LikeButton(props) {
  const { user, screamId } = props;

  const likedScream = () => {
    if (user.likes && user.likes.find(like => like.screamId === screamId)) {
      return true;
    } else return false;
  };

  const likeScream = () => props.likeScream(screamId);

  const unlikeScream = () => props.unlikeScream(screamId);

  const likeButton = !user.authenticated ? (
    <Link to='/login'>
      <MyButton tip='Like'>
        <FavoriteBorderIcon color='primary' />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip='Unlike' onClick={unlikeScream}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeScream}>
      <FavoriteBorderIcon color='primary' />
    </MyButton>
  );

  return likeButton;
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
