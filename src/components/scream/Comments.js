import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  ...theme,
  commentImage: {
    maxWidth: '100%',
    heigth: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
});

function Comments(props) {
  const { comments, classes } = props;
  return (
    <Grid container>
      {comments.map((comment, i) => {
        const { body, createdAt, userImage, userHandle } = comment;

        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt='comment'
                    className={classes.commentImage}
                  />
                </Grid>

                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant='h5'
                      component={Link}
                      to={`/users/${userHandle}`}
                      color='primary'
                    >
                      {userHandle}
                    </Typography>

                    <Typography variant='body2' color='textSecondary'>
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />

                    <Typography variant='body1'>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {(i !== comments.length - 1 || comments.length !== 0) && (
              <hr className={classes.visibleSeperator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
