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