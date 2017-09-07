import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4>be really extraordinary.</h4>
            <figure><a href="index.html"><img src="img/footer-logo.png" alt="" /></a></figure>
            <p>&copy;2015 <a href="index.html">Gaybre</a>. All rights reserved. </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Header.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   body: PropTypes.string.isRequired,
//   debug: PropTypes.bool.isRequired,
// };

export default Footer;
