import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const logo = require('../logo.svg');

const Banner = styled.div`
  background-color: #222;
  padding: 20px;
  color: white;
`;

const SpinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLogo = styled.img`
  animation: ${SpinAnimation} infinite 20s linear;
  height: 80px;
`;

const Title = styled.div`
  font-size: 1.5em;
`;

export const Header = () => (
    <Banner>
      <AppLogo src={logo} alt="logo"/>
      <Title>
        Welcome to React
      </Title>
      <Link to="/">
        <p>Route One</p>
      </Link>
      <Link to="/routetwo">
        <p>Route Two</p>
      </Link>
      <Link to="/asdf">
        <p>404 URL</p>
      </Link>
    </Banner>
);