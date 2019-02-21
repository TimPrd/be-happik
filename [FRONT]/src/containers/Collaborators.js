import React from 'react';
import { Grid } from 'react-flexbox-grid';

import Layout from './Layout';
import Collabs from '../components/Collaborators/Collaborators';

const Collaborators = () => (
  <Layout>
    <Grid fluid>
      <Collabs />
    </Grid>
  </Layout>
);

export default Collaborators;
