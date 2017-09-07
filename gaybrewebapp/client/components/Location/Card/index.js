import React, { PropTypes, Component } from 'react';
import style from './Card.scss';

class PlaceCard extends Component {
  static propTypes = {
    addLocation: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className={style.placeCardWrapper}>
        <div className="title">Title</div>
        <div className="placeImages">Place Image</div>
        <div className="longName">Long Name</div>
        <div className="placeType">Bar</div>
        <div className="placeWebSite">www.ggoogle.com</div>
        <div className="row">
          <div className="col-md-8">
            <div className="Adress">
              <div>Title</div>
              <div>1835 Columbia Street Longer Address Sample</div>
              <div>City | State</div>
              <div>San Francisco, CA</div>
              <div>Zip</div>
              <div>94101</div>
            </div>
          </div>
          <div className="col-md-4">
            <div>310.123.4567</div>
            <div>
              Mon: 11a-10pm
              Tue: 8a-7pm
              Wed: 11a-10pm
              Thu: 11a-10pm
              Fri: 11a-10pm
              Sat: 11a-10pm
              Sun: 11a-10pm
            </div>
          </div>
        </div>
        <div className="description">
          Description
        </div>
        <div className="discounts">
          Discounts
        </div>
      </div>
    );
  }
}

export default PlaceCard;
