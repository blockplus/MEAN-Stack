import React, { PropTypes, Component } from 'react/addons';
import { connect } from 'react-redux';
import { uploadPhoto } from 'client/actions/photos';
import style from './Photos.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPhoto({ photo, id, placeID }) {
      dispatch(uploadPhoto({ photo, id, placeID }));
    },
  };
};

const mapStateToProps = ({ locations }, props) => {
  const { placeID, id } = props;
  const [place = {}]  = locations.filter((el) => {
    return el.id == placeID
  });
  const { imageurls = [] } = place;
  return {
    src: imageurls[id] || 'img/location-thumb.jpg',
  };
};

export default class LocationPhotos extends Component {
  static propTypes = {
    uploadPhoto: PropTypes.func.isRequired,
    placeID: PropTypes.string,
    id: PropTypes.number,
    src: PropTypes.string,
  }

  onChange = (event) => {
    const photo = event.target.files[0];
    const { placeID, id } = this.props;
    this.props.uploadPhoto({ placeID, id, photo });
  }
  render() {
    return (
      <div>
        <label htmlFor="photos" className={style.photosLabel} >
          <img src={this.props.src} />
          <input type="file" onChange={this.onChange} />
        </label>
      </div>
    );
  }
}


const Photos = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPhotos);

export default Photos;
