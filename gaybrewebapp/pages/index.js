import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'client/store';
import IndexPage from 'client/components/IndexPage';

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <IndexPage />
      </Provider>
    );
  }
}
