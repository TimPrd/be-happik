import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Layout from '../Layout';
import ReplySurvey from '../../components/Survey/ReplySurvey';

const ReplySurveyPage = () => (
  <Layout>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Grid>
            <ReplySurvey />
          </Grid>
        </Col>
      </Row>
    </Grid>
  </Layout>
);

export default ReplySurveyPage;
