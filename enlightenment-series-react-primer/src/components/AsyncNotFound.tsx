import asyncComponent from '../containers/AsyncComponent';

export const AsyncNotFound = asyncComponent(() => import('./NotFound').then((module: any) => module.NotFound));