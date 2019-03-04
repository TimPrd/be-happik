import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ActionButton from '../components/Buttons/DashboardActionBtn';
import DashboardInfos from '../components/Dashboard/Infos';
import ChartEmploye from '../components/Dashboard/ChartEmploye';
import Layout from './Layout';
import PlusIcon from '../assets/img/icons/Icon-AddPlus.svg';
import SurveyIcon from '../assets/img/icons/Icon-Survey.svg';
import UserIcon from '../assets/img/icons/Icon-User.svg';

import UserNumber from '../assets/img/icons/Icon-AddUser.svg';
import SpinIcon from '../assets/img/icons/Icon-Spin.svg';
import ChronoIcon from '../assets/img/icons/Icon-Clock.svg';
import WarningIcon from '../assets/img/icons/Icon-NotifWarning.svg';
import { UserContext } from '../contexts';
import ChartSurvey from '../components/Dashboard/ChartSurvey';

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
  <UserContext.Consumer>
    {user => (
      <Layout>
        <Grid fluid>
          <HeadTitle>
            Bienvenue &nbsp;
            {`${user.firstName} ${user.lastName}`}
          </HeadTitle>

          <Row>
            <Col xs={12} md={4}>
              <ActionButton
                icon={PlusIcon}
                title="Créer un sondage"
                text="Diffuser un sondage à une ou plusieurs équipes"
                path="/survey/create"
                color="rose85"
              />
            </Col>

            <Col xs={12} md={4}>
              <ActionButton
                icon={SurveyIcon}
                title="Consulter les sondages"
                text="Accéder aux sondages terminés"
                path="/surveys"
                color="greenc9"
              />
            </Col>

            <Col xs={12} md={4}>
              <ActionButton
                icon={UserIcon}
                title="Gestion des collaborateurs"
                text="Ajouter une équipe ou un collaborateur"
                path="/collaborators"
                color=""
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={4}>
              <DashboardInfos dataInfos={DashboardInformations} />
            </Col>

            <Col xs={12} lg={8}>
              <ChartEmploye />
            </Col>
          </Row>

          <Row>
            
              <ChartSurvey></ChartSurvey>
    
          </Row>

        </Grid>
      </Layout>
    )}
  </UserContext.Consumer>
);

export default Dashboard;
