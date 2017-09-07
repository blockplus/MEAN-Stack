import React, { PropTypes, Component } from 'react/addons';
import Upload from './upload';
import style from './Photos.scss'

export default class LocationPhotos extends Component {
  static propTypes = {
    placeID: PropTypes.number,
  }
  render() {
    return (
      <div className="locationBanner">
        <div className={style.locationThumb}>
          <Upload id={0} placeID={this.props.placeID} />
          <Upload id={1} placeID={this.props.placeID} />
          <Upload id={2} placeID={this.props.placeID} />
          <Upload id={3} placeID={this.props.placeID} />
          <Upload id={4} placeID={this.props.placeID} />
        </div>
      </div>
    );
  }
}
