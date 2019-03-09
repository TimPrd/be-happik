import React from 'react';
import { Grid } from 'react-flexbox-grid';

import Layout from '../Layout';

import AllSurveys from '../../components/Survey/AllSurveys';

const CreateSurveyPage = () => (
  <Layout>
    <Grid>
      <AllSurveys/>
    </Grid>
  </Layout>
);

export default CreateSurveyPage;
