import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Layout from '../Layout';

import AllSurveys from '../../components/Survey/AllSurveys';

const CreateSurveyPage = () => (
  <Layout>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Grid>
            <AllSurveys />
          </Grid>
        </Col>
      </Row>
    </Grid>
  </Layout>
);

export default CreateSurveyPage;
