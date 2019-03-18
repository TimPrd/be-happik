import React from 'react';
import { Grid } from 'react-flexbox-grid';


import Layout from '../Layout';

import CreateSurvey from '../../components/Survey/CreateSurvey';


const CreateSurveyPage = () => (
  <Layout>
    <Grid>
        <CreateSurvey />
    </Grid>
  </Layout>
);

export default CreateSurveyPage;
