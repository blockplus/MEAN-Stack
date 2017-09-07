import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationsForm from './form';
import { savingLocation, updatingLocation, deletingLocation } from 'client/actions/locations';
class AddFormIndex extends Component {
  render() {
    return (
      <div>
        <LocationsForm { ...this.props} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit(location) {
      const { idLocation, added } = props;
      const locationForSave = {...location, ...{ id: idLocation }}
      const dispatchObject = (added ? savingLocation : updatingLocation)(locationForSave, idLocation);
      dispatch(dispatchObject);
      return false;
    },
    deleteLocation(idLocation) {
      const result = confirm('Are you sure want to delete?'); //eslint-disable-line
      if (result) dispatch(deletingLocation(idLocation));
    },
  };
};
const Location = connect(
  null,
  mapDispatchToProps
)(AddFormIndex);

export default Location;
