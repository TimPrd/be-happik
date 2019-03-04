import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import UserIcon from '../../assets/img/icons/Icon-UserGrey.svg';

const CardItem = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  margin: ${props => props.theme.custom.subtitle}px 0;
  padding: ${props => props.theme.custom.bigtext}px;
`;

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

  &.isNotRegistered {
    border: 1px solid ${props => props.theme.colors.blue6B};
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;


  &.isNotRegistered {
    width: ${props => props.theme.custom.subtitle}px;
    height: ${props => props.theme.custom.subtitle}px;
  }
`;

const Infos = styled.div`
  // width: 50px;
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.theme.custom.text}px;
`;

const Name = styled.h3`
  margin: 0;
  text-align: left;
  font-weight: 800;
  font-size: ${props => props.theme.custom.bigtext}px;
`;

const Details = styled.p`
  margin: 0;
  text-align: left;
  font-size: ${props => props.theme.custom.text}px;
`;

const Card = (props) => {
  const { user } = props;

  return (
    <CardItem>
      <AvatarContainer className={user.isRegistered ? '' : 'isNotRegistered'}>
        <Avatar
          src={user.avatar ? user.img : UserIcon}
          className={user.isRegistered ? '' : 'isNotRegistered'}
        />
      </AvatarContainer>

      <Infos>
        <Name>
          {user.firstName}
          &nbsp;
          {user.lastName}
        </Name>
        <Details>
          {user.Team.teamName}
        </Details>
        <Details>
          {user.email}
        </Details>
      </Infos>
    </CardItem>
  );
};

Card.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Card;
