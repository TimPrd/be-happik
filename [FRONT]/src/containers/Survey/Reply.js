import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import Layout from '../Layout';

import ReplySurvey from '../../components/Survey/ReplySurvey';

const Title = styled.h1`
  text-align: left;
  font-size: ${props => props.theme.custom.subtitle}px;
  font-weight: 600;
  line-height: 1;
  color: #4d4d4d;
`;

const ReplySurveyPage = () => (
  <Layout>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Title>Création de sondage</Title>
          <Grid>
            <ReplySurvey />
          </Grid>
        </Col>
      </Row>
    </Grid>
  </Layout>
);

export default ReplySurveyPage;
