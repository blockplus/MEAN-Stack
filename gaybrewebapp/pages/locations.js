import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'client/store';
import LocationPage from 'client/components/LocationPage';

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocationPage />
      </Provider>
    );
  }
}
