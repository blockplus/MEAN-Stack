import React, { Component } from 'react';
import Header from '../Header';
import SlideMain from '../Slides/main';
import SlideProudly from '../Slides/proudly_slide';
import SlideGirls from '../Slides/girls';
import SlideBusiness from '../Slides/business';
import SlidePricing from '../Slides/pricing';
import Footer from '../Footer';
import Popup from '../Popup';

export default class extends Component {
  render() {
    return (
      <div>
        <Header />
        <Popup />
        <SlideMain />
        <SlideProudly />
        <SlideGirls />
        <SlideBusiness />
        <SlidePricing />
        <Footer />
      </div>
    );
  }
}
