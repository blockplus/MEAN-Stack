import React from 'react';

const LocationNav = () => {
  return (
    <div className="locationNav">
      <ul>
        <li className="active"><a href="#"><i className="fa fa-map-marker"></i>My Business</a></li>
        <li><a href="#"><i className="fa fa-map-signs"></i>+ Add Location</a></li>
        <li><a href="#"><i className="fa fa-user"></i>Account</a></li>
      </ul>
    </div>
  );
};

// Header.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   body: PropTypes.string.isRequired,
//   debug: PropTypes.bool.isRequired,
// };

export default LocationNav;
