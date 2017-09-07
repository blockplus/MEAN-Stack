import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LocationLayout from '../Location';
import Popup from '../Popup';

export default class extends Component {
  render() {
    return (
      <div>
        <Header />
        <Popup />
        <LocationLayout />
        <Footer />
      </div>
    );
  }
}
