import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from '../assets/img/icons/Icon-dashboard.svg';
import { ReactComponent as MessageIcon } from '../assets/img/icons/Icon-Message.svg';
import { ReactComponent as SurveyIcon } from '../assets/img/icons/icon_SurveyGrey.svg';
import { ReactComponent as UserIcon } from '../assets/img/icons/Icon-UserGrey.svg';
import { ReactComponent as HelpIcon } from '../assets/img/icons/Icon-Support.svg';
import { ReactComponent as SettingsIcon } from '../assets/img/icons/Icon-Setting.svg';
import { ReactComponent as CloseIcon } from '../assets/img/icons/Icon-Close.svg';
import { ReactComponent as MenuIcon } from '../assets/img/icons/Icon-open-menu.svg';
import logo from '../assets/img/icons/logo.svg';

const Container = styled.div`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  background-color: ${props => props.theme.colors.greyf7};
  position: fixed;
  top: 0;
  left: -250px;
  transition: all 1s;

  &.sidebar__open {
    left: 0;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 80px;
  justify-content: center;
  margin: ${props => props.theme.custom.title}px 0 80px;
`;
const Logo = styled.img`
  width: 80px;
`;

const ClosePicto = styled.div`
  width: ${props => props.theme.custom.bigtext}px;
  height: ${props => props.theme.custom.bigtext}px;
  position: absolute;
  right: ${props => props.theme.custom.bigtext}px;
  top: ${props => props.theme.custom.bigtext}px;
`;

const MenuPicto = styled.div`
  width: ${props => props.theme.custom.bigtext}px;
  height: ${props => props.theme.custom.bigtext}px;
  position: absolute;
  right: -${props => props.theme.custom.title}px;
  top: 35px;
  transform: translateY(-50%);

  @media screen and (max-width: 640px) {
    display: block;
  }
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
    url: '/survey',
  },
  {
    pageName: 'Collaborateurs',
    Icon: UserIcon,
    url: '/collaborators',
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
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { sideBarOpen } = this.state;

    this.setState({ sideBarOpen: !sideBarOpen });
  }

  render() {
    const { sideBarOpen } = this.state;

    return (
      <Container className={sideBarOpen ? 'sidebar__open' : null}>
        {sideBarOpen ? (
          <ClosePicto onClick={this.handleClick}>
            <CloseIcon fill="#bdbdc1" />
          </ClosePicto>
        ) : null}

        {!sideBarOpen ? (
          <MenuPicto onClick={this.handleClick}>
            <MenuIcon fill="#bdbdc1" />
          </MenuPicto>
        ) : null}

        <LogoContainer>
          <Link to="/">
            <Logo src={logo} />
          </Link>
        </LogoContainer>

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
  }
}

export default SideBar;
