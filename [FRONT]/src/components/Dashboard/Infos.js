import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 0 10%;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const InfosTitle = styled.h2`
  width: 100%;
  font-size: ${props => props.theme.custom.subtitle}px;
  text-align: left;
  margin: 0;
  font-weight: normal;
  border-bottom: 1px solid ${props => props.theme.colors.greyec};
  padding: 25px 0;
`;

const InfosSections = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.custom.bigtext}px 0;
  border-bottom: 1px solid ${props => props.theme.colors.greyec};

  &:last-child {
    border-bottom: 0;
  }
`;

const InfosSectionsText = styled.div`
  font-size: ${props => props.theme.custom.mediumtext}px;
  flex-grow: 1;
  text-align: left;
  padding: 0 ${props => props.theme.custom.bigtext}px;
`;

const InfosSectionsNumber = styled.div`
  font-weight: 600;
  font-size: ${props => props.theme.custom.bigtext}px;
`;

const DashboardInfos = ({ dataInfos }) => (
  <Container>
    <InfosTitle>
      Informations générales
    </InfosTitle>

    {dataInfos.map((info, index) => (
      <InfosSections key={index.toString()}>
        <Icon src={info.picto} />

        <InfosSectionsText>
          {info.title}
        </InfosSectionsText>
        <InfosSectionsNumber>
          {info.number}
        </InfosSectionsNumber>
      </InfosSections>
    ))}
  </Container>
);

DashboardInfos.propTypes = {
  dataInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DashboardInfos;
