import asyncComponent from '../containers/AsyncComponent';

export const AsyncRouteOne = asyncComponent(() => import('./RouteOne').then((module: any) => module.RouteOne));