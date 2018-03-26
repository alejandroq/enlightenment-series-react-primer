import asyncComponent from '../containers/AsyncComponent';

export const AsyncRouteTwo = asyncComponent(() => import('./RouteTwo').then((module: any) => module.RouteTwo));