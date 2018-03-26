import * as React from 'react';
import styled from 'styled-components';

const AppIntro = styled.div`
    font-size: large;
`;

export const RouteTwo = () => (
    <AppIntro>
        <p>This is Route Two</p>
        <p>To get started, edit <code>src/App.tsx</code> and save to reload</p>
    </AppIntro>
);