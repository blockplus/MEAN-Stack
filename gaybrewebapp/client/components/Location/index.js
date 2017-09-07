import React, { PropTypes, Component } from 'react';
import LocationNav from './Nav';
import LocationAddForm from './AddForm';
import LocationAddPlaceholder from './Placeholder';
import LocationPhotos from './Photos';
import LocationMap from './Map';
import { connect } from 'react-redux';

class LocationLayout extends Component {
  static propTypes = {
    locations: PropTypes.arrayOf(
      PropTypes.object.isRequired
    ).isRequired,
  }
  render() {
    const { locations } = this.props;
    return (
      <section className="locationSection">
        <div className="innerPage">
          <div className="container">
            <LocationNav />
            {
                locations.map((place, index) => (
                  <div key={index}>
                    <LocationMap
                      center={place.loc}
                      key={`locationMap${index}`}
                    />
                    <LocationPhotos
                      key={`locationPhotos${index}`}
                      placeID={place.id}
                    />
                    <LocationAddForm
                      idLocation={place.id}
                      added={place.added}
                      key={`locationAddForm${index}`}
                      formKey={index.toString()}
                    />
                  </div>
              ))
            }
            <LocationAddPlaceholder />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ locations }) => {
  return {
    locations,
  };
};

const Location = connect(
  mapStateToProps,
  null
)(LocationLayout);

export default Location;


// Header.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   body: PropTypes.string.isRequired,
//   debug: PropTypes.bool.isRequired,
// };

export default Location;
