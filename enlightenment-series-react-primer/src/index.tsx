import * as React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { AppShell } from './components/AppShell';

render(
  <Router>
    <AppShell />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
