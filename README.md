# Functional React Primer with a bit of PRPL PWA Pattern (featuring Typescript), but Minus Critical CSS Server-Side Rendering
*By Alejandro Quesada*

- [Functional React Primer with a bit of PRPL PWA Pattern (featuring Typescript), but Minus Critical CSS Server-Side Rendering](#functional-react-primer-with-a-bit-of-prpl-pwa-pattern-featuring-typescript-but-minus-critical-css-server-side-rendering)
  - [Get Started](#get-started)
  - [Links](#links)
  - [Extra Credit](#extra-credit)

## Get Started
1. `> create-react-app enlightenment-series --scripts-version=react-scripts-ts`
2. `> cd enlightenment-series`
3. "Initial Build" Lighthouse Performance [Feed-1](#feed-1) 
4. `> yarn add react-snapshot`
5. For the purposes of this presentation invert "noImplicitAny" to false 
```json
{
  "compilerOptions": {
    "outDir": "build/dist",
    "module": "esnext",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts"
  ]
}
```
4. The browser renders markup and styles before it parses through Javascript, so lets send the aforementioned in its complete state. Replace ReactDOM.render in `src/index.tsx` with:
```tsx
import * as React from 'react';
import { render } from 'react-snapshot';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```
5. Update the package.json "build" script:
```json
{
  "name": "enlightenment-series",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-helmet": "^5.2.0",
    "react-scripts-ts": "2.14.0",
    "react-snapshot": "^1.3.0"
  },
  "scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build && react-snapshot",
    "test": "react-scripts-ts test --env=jsdom",
    "eject": "react-scripts-ts eject"
  },
  "devDependencies": {
    "@types/jest": "^22.2.2",
    "@types/node": "^9.6.0",
    "@types/react": "^16.0.41",
    "@types/react-dom": "^16.0.4",
    "typescript": "^2.7.2"
  }
}
```
6. "React Snapshot" Lighthouse Performance [Feed-2](#feed-2); We will compare the `<body></body>` tags of the original and react-snapshot HTML documents:
```html
<!-- Original -->
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="text/javascript" src="/static/js/main.fca5d544.js"></script>
</body>

<!-- React-Snapshot -->
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
        <div class="App" data-reactroot="">
            <header class="App-header">
                <img src="/static/media/logo.5d5d9eef.svg" class="App-logo" alt="logo">
                <h1 class="App-title">Welcome to React</h1>
            </header>
            <p class="App-intro">To get started, edit
                <code>src/App.tsx</code> and save to reload.</p>
        </div>
    </div>
    <script type="text/javascript" src="/static/js/main.fca5d544.js"></script>
</body>
```
7. Whilst the hydration effect is minimal at this level of application simplicity; it scales well (and can be uses for multiple routes, an oppurtunity for AMP HTML rendering). React-Snapshot is preferrable IF serving static, however there is Server-side rendering as well. Why do this? For intial perceptual performance and SEO. Let's reduce our CSS demand by incorprating it into our Javascript. Thereinby our transpile will treeshake redundant and unused styles whilst allowing us to style at the component level.
8. `> yarn add styled-components`
9. Update `src/App.tsx` accordingly (notice the `src/App.css` styles are now encorporated into module limited components):
```tsx
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {}

const logo = require('./logo.svg');

const AppContainer = styled.div`
  text-align: center;
`;

const AppLogoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/** Note: functional capability here. */
const AppLogo = styled.img`
  animation: ${AppLogoSpin} infinite 20s linear;
  height: 80px;
`;

const AppHeader = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const AppTitle = styled.div`
  font-size: 1.5em;
`;

const AppIntro = styled.div`
  font-size: large;
`;

const App = (props: Props) => (
  <AppContainer>
    <AppHeader>
      <AppLogo src={logo} alt="logo"/>
      <AppTitle>
        Welcome to React
      </AppTitle>
    </AppHeader>
    <AppIntro>
      To get started, edit <code>src/App.tsx</code> and save to reload
    </AppIntro>
  </AppContainer>
);

export default App;
```
10. The new HTML `<body></body>` is as so (note: the new style classes embedded in the Javascript below):
```html
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
        <div class="sc-bdVaJa khUSez" data-reactroot="">
            <div class="sc-htpNat bvrYjX">
                <img class="sc-bwzfXH ldyXqg" src="/static/media/logo.5d5d9eef.svg" alt="logo">
                <div class="sc-bxivhb dJLTzd">Welcome to React</div>
            </div>
            <div class="sc-ifAKCX bsUOqa">To get started, edit
                <code>src/App.tsx</code> and save to reload</div>
        </div>
    </div>
    <script type="text/javascript" src="/static/js/main.1bbbc589.js"></script>
</body>
```
11. Time to add routes via React-Router.
12. `> yarn add react-router-dom`
13. `> mkdir src/components`
14. `> mkdir src/containers`
15. `> touch src/components/AppShell.tsx src/components/AppRouter.tsx src/components/RouteOne.tsx src/components/RouteTwo.tsx src/components/NotFound.tsx`

16. In `src/containers/AsyncContainer.tsx`: 
```tsx
import * as React from 'react';

export default function asyncComponent(getComponent: any) {
    class AsyncComponent extends React.Component {
        static Component: any;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then((Component: any) => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component });
                });
            }
        }

        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />;
            }
            return null;
        }
    }
    return AsyncComponent;
}
```
17. In `src/components/AppShell.tsx`:
```tsx
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
```
18. In `src/components/Header.tsx`:
```tsx
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const logo = require('../logo.svg');

const Banner = styled.div`
  background-color: #222;
  height: 150px;
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
```
19. In `src/components/AppRouter.tsx`:
```tsx
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteOne } from './RouteOne';
import { RouteTwo } from './RouteTwo';
import { NotFound } from './NotFound';

/** Note: purely declarative routing */
export const AppRouter = () => (
    <main>
        <Switch>
            <Route path="/routetwo" component={RouteTwo} />
            <Route exact={true} path="/" component={RouteOne} />
            <Route component={NotFound} />
        </Switch>
    </main>
);
```
20. In `src/components/RouteOne.tsx`:
```tsx
import * as React from 'react';
import styled from 'styled-components';

const AppIntro = styled.div`
    font-size: large;
`;

export const RouteOne = () => (
    <AppIntro>
        <p>This is Route One</p>
        <p>To get started, edit <code>src/App.tsx</code> and save to reload</p>
    </AppIntro>
);
```
21. In `src/components/RouteTwo.tsx`:
```tsx
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
```
22: Add Router in `src/index.tsx` to:
```tsx
import * as React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter as Router } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import { AppShell } from './components/AppShell';

render(
  <Router>
    <AppShell />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```
23. In `src/components/NotFound.tsx`:
```tsx
import * as React from 'react';

export const NotFound = () => <h3>404: Not Found</h3>;
```
16. `> touch src/containers/AsyncContainer.tsx src/components/AsyncRouteTwo.tsx src/components/AsyncNotFound.tsx`
25. Update `src/components/AppRouter.tsx` for Async Routes:
```tsx
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteOne } from './RouteOne';
import { AsyncRouteTwo as RouteTwo } from './AsyncRouteTwo';
import { AsyncNotFound as NotFound } from './AsyncNotFound';

/** Note: purely declarative routing */
export const AppRouter = () => (
    <main>
        <Switch>
            <Route path="/routetwo" component={RouteTwo} />
            <Route exact={true} path="/" component={RouteOne} />
            <Route component={NotFound} />
        </Switch>
    </main>
);
```
26: In `src/components/AsyncRouteTwo.tsx`:
```tsx
import asyncComponent from '../containers/AsyncComponent';

export const AsyncRouteTwo = asyncComponent(() => import('./RouteTwo').then((module: any) => module.RouteTwo));
```
26: In `src/components/AsyncNotFound.tsx`:
```tsx
import asyncComponent from '../containers/AsyncComponent';

export const AsyncNotFound = asyncComponent(() => import('./NotFound').then((module: any) => module.NotFound));
```
27: `> yarn build`
28: `> aws s3 mb "s3://enlightenment-series-4604bd5718a4f7eaf48ee7b081de4c2813d9470d" --profile testaccount --region us-east-1`
29: `> aws s3 website "s3://enlightenment-series-4604bd5718a4f7eaf48ee7b081de4c2813d9470d" --index-document index.html --error-document index.html --profile testaccount --region us-east-1`
30: `> aws s3 sync build "s3://enlightenment-series-4604bd5718a4f7eaf48ee7b081de4c2813d9470d" --profile testaccount --region us-east-1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers`
31: The S3 URL is now: `http://enlightenment-series-4604bd5718a4f7eaf48ee7b081de4c2813d9470d.s3-website-us-east-1.amazonaws.com/`
32: Create the CloudFront according to this article: `https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af`. Why use CloudFront CDN? CloudFront will cache and distribute static documents geographically closer to users at local AWS Edge Locations. This translates to a user in San Francisco having a comporable experience to one in Washington DC despite the assets originating from region us-east-1 (because a Californian would get the asset next door). The contrast to this (and more typical) is that a request from California would have to travel across the United States and back thereinby negatively affecting an entire coast's user experience. The reduction of network travel should minimize bounce rates, etc. CloudFront quickly enables HTTP/2 and distributes SSLs for HTTPS. This should provide us a good mark below on our Progressive Web Application:  
33: What we have... (with offline, etc)

## Links
- https://developers.google.com/web/fundamentals/performance/prpl-pattern/
<!-- - https://github.com/redux-observable/redux-observable -->
<!-- - https://facebook.github.io/flux/ -->
- http://www.typescriptlang.org/
<!-- - http://reactivex.io/rxjs/ -->
- https://github.com/nfl/react-helmet
- https://github.com/geelen/react-snapshot
- https://en.wikipedia.org/wiki/Functional_programming
<!-- - https://12factor.net/ -->
- https://developers.google.com/web/progressive-web-apps/
- https://developers.google.com/web/tools/lighthouse/
<!-- - https://www.ampproject.org/ -->
<!-- - https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf -->

## Extra Credit
- https://storybook.js.org/ in-lieu of http://patternlab.io/