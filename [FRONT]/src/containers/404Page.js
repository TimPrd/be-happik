import React from 'react';
import { Grid } from 'react-flexbox-grid';

import Layout from './Layout';

const NotFoundPage = () => (
  <Layout>
    <Grid fluid>
      <h1>
        404 PAGE NOT FOUND
        <span role="img" aria-label=""> 😢 </span>
      </h1>
    </Grid>
  </Layout>
);

export default NotFoundPage;
