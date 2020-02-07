import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';

export default function HomePage() {
  const [screams, setScreams] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/screams')
      .then(res => {
        console.log(res.data);
        setScreams(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  let recentScreamsMarkup = screams ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>

      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
}
