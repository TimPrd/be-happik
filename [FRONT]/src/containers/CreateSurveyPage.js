import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Layout from './Layout';

import CreateSurvey from '../components/Survey/CreateSurvey';

const CreateSurveyPage = () => (
  <Layout>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <CreateSurvey />
        </Col>
      </Row>
    </Grid>
  </Layout>
);

export default CreateSurveyPage;
