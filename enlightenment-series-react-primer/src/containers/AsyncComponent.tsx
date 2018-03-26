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
