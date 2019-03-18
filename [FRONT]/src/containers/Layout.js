import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SideBar from './SideBar';
import NavBar from './NavBar';
const LayoutContainer = styled.div`

  height: 100vh;
  margin: 0 0 0 200px;
  @media screen and (max-width: 991px) {
    margin: 0;
  }
`;

const Header = styled.div`
  
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  z-index: 1;
`;

const Aside = styled.div`

 position: absolute;
 left: 0;
 z-index: 2;
 width: 220px;
`;

const Content = styled.div`

z-index: 0;
margin-top: 40px;

  
`;


const Layout = ({ children }) => (
  
  <LayoutContainer className="app__layout-container">
    <Aside className="app__sideBar">
      <SideBar/>
    </Aside>

    <Header className="app__header">
      <NavBar />
    </Header>

    <Content>
      {children}
    </Content>
  </LayoutContainer>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
