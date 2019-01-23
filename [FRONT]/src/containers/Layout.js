import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SideBar from './SideBar';
import NavBar from './NavBar';

const LayoutContainer = styled.div`
  widht: 100%;
`;

const Header = styled.div`
  width: 100vw;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 0;
`;

const Aside = styled.div`
  width: 250px;
  height: 100vh;
  z-index: 1;
  position: absolute;
`;

const Content = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  margin-top: 70px;
`;

const Layout = ({ children }) => (
  <LayoutContainer>
    <Aside className="app__sideBar">
      <SideBar />
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
