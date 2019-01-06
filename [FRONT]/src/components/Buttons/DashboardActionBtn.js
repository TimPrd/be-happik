import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ButtonNextIcon from '../../assets/img/icons/Icon-ButtonNext.svg';

const titleColor = color => props => props.theme.colors[color];

const Btn = styled.div`
  max-height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  border-radius: 2px;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const BtnText = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 0 ${props => props.theme.custom.bigtext}px;
  flex-direction: column;
`;

const BtnTextTitle = styled.div`
  width: 100%;
  font-size: ${props => props.theme.custom.bigtext}px;
  text-align: left;
  color: ${props => titleColor(props.color)};
  margin-bottom: 7px;
`;

const BtnTextSubTitle = styled.div`
  width: 100%;
  font-size: ${props => props.theme.custom.text}px;
  text-align: left;
  color: ${props => props.theme.colors.black};
`;

const ButtonNext = styled.a`
  display: flex;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const ActionButton = ({
  icon,
  title,
  text,
  path,
  color,
}) => (
  <Btn>
    <Icon src={icon} />

    <BtnText>
      <BtnTextTitle color={color}>
        {title}
      </BtnTextTitle>

      <BtnTextSubTitle>
        {text}
      </BtnTextSubTitle>
    </BtnText>

    {path !== '' ? (
      <ButtonNext href={path}>
        <Icon src={ButtonNextIcon} />
      </ButtonNext>
    ) : ''}
  </Btn>
);

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  path: PropTypes.string,
  color: PropTypes.string,
};

ActionButton.defaultProps = {
  title: '',
  text: '',
  path: '',
  color: 'black',
};

export default ActionButton;
