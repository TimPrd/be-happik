import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-flexbox-grid';

import GreenShape from '../assets/img/courbe-verte.svg';
import Logo from '../assets/img/icons/logo.svg';

const LeftLogin = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.greyf7};
  background-image: url(${Logo});
  background-size: 130px 147px;
  background-position: center;
  background-repeat: no-repeat;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    background: url(${GreenShape});
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  @media (max-width: 48em) {
    display: none;
  }
`;

const Layout = ({ children }) => (
  <Grid fluid>
    <Row middle="xs">
      <Col xs={0} md={4}>
        <LeftLogin />
      </Col>

      <Col xs={12} md={8} style={{ zIndex: 1 }}>
        {children}
      </Col>
    </Row>
  </Grid>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
