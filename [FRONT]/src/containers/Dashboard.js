import React from 'react';
import styled from 'styled-components';

import ActionButton from '../components/Buttons/DashboardActionBtn';
import DashboardInfos from '../components/Dashboard/Infos';
import ChartEmploye from '../components/Dashboard/ChartEmploye';
import PlusIcon from '../assets/img/icons/Icon-AddPlus.svg';
import SurveyIcon from '../assets/img/icons/Icon-Survey.svg';
import UserIcon from '../assets/img/icons/Icon-User.svg';

import UserNumber from '../assets/img/icons/Icon-AddUser.svg';
import SpinIcon from '../assets/img/icons/Icon-Spin.svg';
import ChronoIcon from '../assets/img/icons/Icon-Clock.svg';
import WarningIcon from '../assets/img/icons/Icon-NotifWarning.svg';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10%;
`;

const HeadTitle = styled.h1`
  width: 100%;
  font-size: ${props => props.theme.custom.title}px;
  text-align: left;
  padding: 0;
`;

const HeadSubTitle = styled.div`
  font-size: ${props => props.theme.custom.bigtext}px;
  padding: 0;
`;

const ActionsSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Section = styled.div`
  width: 33.33%;
  box-sizing: border-box;
  padding: 0 10px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  margin-top: 50px;
`;

const InfosSection = styled.div`
  width: 30%;
  box-sizing: border-box;
`;

const ChartSection = styled.div`
  width: 65%;
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 30px;
  margin-left: 5%;
`;

const DashboardInformations = [
  {
    picto: UserNumber,
    title: 'Nombre de collaborateurs',
    number: 68,
  },
  {
    picto: SpinIcon,
    title: 'Nombre d’équipes',
    number: 23,
  },
  {
    picto: ChronoIcon,
    title: 'Nombre de sondages diffusés',
    number: 5,
  },
  {
    picto: WarningIcon,
    title: 'Notifications en attente',
    number: 6,
  },
];

const Dashboard = () => (
  <Container>
    <HeadTitle>
      Bienvenue Nacer-Eddine !
    </HeadTitle>

    <HeadSubTitle>
      Ici un text descriptif sur un theme !!
    </HeadSubTitle>

    <ActionsSection>
      <Section>
        <ActionButton
          icon={PlusIcon}
          title="Créer un sondage"
          text="Diffuser un sondage à une ou plusieurs équipes"
          path="/survey/create"
          color="rose85"
        />
      </Section>

      <Section>
        <ActionButton
          icon={SurveyIcon}
          title="Consulter les sondages"
          text="Accéder aux sondages terminés"
          path="/survey/all"
          color="greenc9"
        />
      </Section>

      <Section>
        <ActionButton
          icon={UserIcon}
          title="Gestion des collaborateurs"
          text="Ajouter une équipe ou un collaborateur"
          path="/users/add"
          color=""
        />
      </Section>
    </ActionsSection>

    <Row>
      <InfosSection>
        <DashboardInfos dataInfos={DashboardInformations} />
      </InfosSection>

      <ChartSection>
        <ChartEmploye />
      </ChartSection>
    </Row>
  </Container>
);

export default Dashboard;
