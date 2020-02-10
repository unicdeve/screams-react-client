import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import { getScreams } from '../redux/actions/dataActions';

function HomePage(props) {
  const { screams, loading } = props.data;

  const { getScreams: getAllScreams } = props;

  React.useEffect(() => {
    getAllScreams();
  }, [getAllScreams]);

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

HomePage.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(HomePage);
