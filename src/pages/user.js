import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { getUserData } from '../redux/actions/dataActions';
import Scream from '../components/scream/Scream';
import axios from 'axios';
import StaticProfile from '../components/profile/StaticProfile';

function User(props) {
  const { getUserData: getUser } = props;
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

  const handle = props.match.params.handle;
  const screamId = props.match.params.screamId;

  useEffect(() => {
    if (screamId) setScreamIdParam(screamId);

    getUser(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }, [handle, getUser, screamId]);

  const { screams, loading } = props.data;

  const screamsMarkup = loading ? (
    <p>loading data...</p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} />;
      else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
