import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { AppRouter } from './AppRouter';

const Container = styled.div`
  text-align: center;
`;

export const AppShell = () => (
    <Container>
        <Header />
        <AppRouter />
    </Container>    
);