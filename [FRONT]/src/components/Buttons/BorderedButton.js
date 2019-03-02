import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonComp = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 100px;
  border: 1px solid ${props => props.theme.colors.grey9a};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.grey9a};
  margin: ${props => props.theme.custom.text}px 0;
  cursor: pointer;
`;

const BorderedButton = ({ label, handleClick }) => (
  <ButtonComp type="button" onClick={handleClick}>
    {label}
  </ButtonComp>
);

BorderedButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

BorderedButton.defaultProps = {
  handleClick: () => {},
};

export default BorderedButton;
