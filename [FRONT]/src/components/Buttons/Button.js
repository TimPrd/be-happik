import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonComp = styled.button`
  width: 140px;
  height: 36px;
  border-radius: 100px;
  border: none;
  background-color: ${props => props.theme.colors.rose85};
  color: ${props => props.theme.colors.white};
  margin: ${props => props.theme.custom.text}px 0;
  cursor: pointer;
`;

const Button = ({ label, handleClick }) => (
  <ButtonComp type="button" onClick={handleClick}>
    {label}
  </ButtonComp>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  handleClick: () => {},
};

export default Button;
