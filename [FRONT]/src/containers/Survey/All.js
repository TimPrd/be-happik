import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import Layout from '../Layout';

import AllSurveys from '../../components/Survey/AllSurveys';

const Title = styled.h1`
  text-align: left;
  font-size: ${props => props.theme.custom.subtitle}px;
  font-weight: 600;
  line-height: 1;
  color: #4d4d4d;
`;

const CreateSurveyPage = () => (
  <Layout>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Title>Tous les sondages</Title>
          <Grid>
            <AllSurveys />
          </Grid>
        </Col>
      </Row>
    </Grid>
  </Layout>
);

export default CreateSurveyPage;
