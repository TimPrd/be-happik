import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Layout from '../Layout';

import AllSurveys from '../../components/Survey/AllSurveys';

const CreateSurveyPage = () => (
  <Layout>
    <Grid fluid>
      <AllSurveys />
    </Grid>
  </Layout>
);

export default CreateSurveyPage;
