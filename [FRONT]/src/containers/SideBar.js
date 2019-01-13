import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from '../assets/img/icons/Icon-dashboard.svg';
import { ReactComponent as MessageIcon } from '../assets/img/icons/Icon-Message.svg';
import { ReactComponent as SurveyIcon } from '../assets/img/icons/icon_SurveyGrey.svg';
import { ReactComponent as UserIcon } from '../assets/img/icons/Icon-UserGrey.svg';
import { ReactComponent as HelpIcon } from '../assets/img/icons/Icon-Support.svg';
import { ReactComponent as SettingsIcon } from '../assets/img/icons/Icon-Setting.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  background-color: ${props => props.theme.colors.greyf7};
`;

const List = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0;
  color: ${props => props.theme.colors.greyc1};

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.greyc1};
  }
`;

const ListItem = styled.li`
  width: 100%;
  height: auto;
  display: flex;
  padding: ${props => props.theme.custom.bigtext}px;
  border-left: 5px solid transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 5px solid ${props => props.theme.colors.greenc9};

    svg {
      fill:  ${props => props.theme.colors.greenc9};
    }
  }
`;

const P = styled.p`
  margin: 0;
  margin-left: ${props => props.theme.custom.text}px;
`;

const MenuMock = [
  {
    pageName: 'Tableau de bord',
    Icon: DashboardIcon,
    url: '/dashboard',
  },
  {
    pageName: 'Messagerie',
    Icon: MessageIcon,
    url: '/Messagerie',
  },
  {
    pageName: 'Sondages',
    Icon: SurveyIcon,
    url: '/Sondages',
  },
  {
    pageName: 'Collaborateurs',
    Icon: UserIcon,
    url: '/Collaborateurs',
  },
  {
    pageName: 'Aide',
    Icon: HelpIcon,
    url: '/help',
  },
  {
    pageName: 'Paramètres',
    Icon: SettingsIcon,
    url: '/settings',
  },
];

const SideBar = () => (
  <Container>
    <List>
      {MenuMock.map(({ pageName, Icon, url }, index) => (
        <Link to={url} key={index.toString()}>
          <ListItem>
            <Icon
              width="16px"
              height="16px"
              fill="#bdbdc1"
            />
            <P>{pageName}</P>
          </ListItem>
        </Link>
      ))}
    </List>
  </Container>
);

export default SideBar;
