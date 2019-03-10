import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from '../assets/img/icons/Icon-dashboard.svg';
import { ReactComponent as SurveyIcon } from '../assets/img/icons/icon_SurveyGrey.svg';
import { ReactComponent as UserIcon } from '../assets/img/icons/Icon-UserGrey.svg';
import { ReactComponent as CloseIcon } from '../assets/img/icons/Icon-Close.svg';
import { ReactComponent as MenuIcon } from '../assets/img/icons/Icon-open-menu.svg';
import logo from '../assets/img/icons/logo.svg';

const Container = styled.div`
  height: 100vh;
  width: 200px;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  position: fixed;
  background-color: ${props => props.theme.colors.greyf7};  
  transition-duration: .5s;

@media screen and (max-width: 991px){
  position: fixed;
  left:-200px;
  grid-area: sidenav;
  transition-duration: .5s;
  
}
 

`;

const LogoContainer = styled.div`
  width: 100%;
  height: 80px;
  justify-content: center;
  margin: 0 0 ${props => props.theme.custom.title}px;
  padding: ${props => props.theme.custom.title}px 0 80px;
`;
const Logo = styled.img`
  width: 80px;
`;

const ClosePicto = styled.div`
  width: ${props => props.theme.custom.bigtext}px;
  height: ${props => props.theme.custom.bigtext}px;
  position: absolute;
  right: -${props => props.theme.custom.title}px;
  top: 35px;
  transform: translateY(-50%);

  @media screen and (min-width: 991px){
    display:none;
  }

`;

const MenuPicto = styled.div`
  width: ${props => props.theme.custom.bigtext}px;
  height: ${props => props.theme.custom.bigtext}px;
  position: absolute;
  right: -${props => props.theme.custom.title}px;
  top: 35px;
  transform: translateY(-50%);
  @media screen and (min-width: 991px){
    display:none;
  }

`;

const List = styled.ul`
  height: auto;
  display: relatice;
  flex-direction: column;
  padding: 0;
  color: ${props => props.theme.colors.greyc1};

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.greyc1};
  }

`;

const ListItem = styled.li`


  height: 52px;
  display: flex;
  padding: ${props => props.theme.custom.bigtext}px 0 0 16px;
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    &:after {
      background-color: ${props => props.theme.colors.greenc9};
      width: 5px;
      height: 52px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
    }
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
    pageName: 'Sondages',
    Icon: SurveyIcon,
    url: '/surveys',
  },
  {
    pageName: 'Collaborateurs',
    Icon: UserIcon,
    url: '/collaborators',
  },
  {
    pageName: 'Déconnexion',
    Icon: CloseIcon,
    url: '/logout',
  }
];
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
  }




  handleClick() {
    const { sideBarOpen } = this.state;
   
    this.setState({ sideBarOpen: !sideBarOpen });
    console.log("test");

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
