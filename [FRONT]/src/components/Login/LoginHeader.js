import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h1`
  font-size: ${props => props.theme.custom.title};
  font-weight: bold;
  letter-spacing: normal;
  text-align: left;
`;

const Text = styled.p`
  font-size: ${props => props.theme.custom.subtitle};
  letter-spacing: normal;
  text-align: left;
`;

const LoginHeader = ({ title, subtitle }) => (
  <div>
    <Title>{title}</Title>

    <Text>
      {subtitle}
    </Text>
  </div>
);

LoginHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default LoginHeader;
