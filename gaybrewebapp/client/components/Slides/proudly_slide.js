
import React from 'react';
import proudlyMobile from './img/proudly_mobile.png';
import arrow from './img/arrow.png';

const SlideProudly = () => {
  return (
    <section className="section1" id="section1">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="mImg1">
              <img src={proudlyMobile} alt="" />
            </div>
          </div>
          <div className="col-md-7">
            <h2>Proudly share the places that encourage extraordinary.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas ligula nibh, eget tempor dolor malesuada et. Pellentesque varius nulla vestibulum libero interdum varius. Praesent neque risus, feugiat sed luctus eget, vulputate nec ante. Mauris dignissim metus mauris, at porttitor mauris vehicula eu. </p>
            <div className="arrowCircle center-block single-page-nav2">
              <a href="#section2">
                <img src={arrow} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Header.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   body: PropTypes.string.isRequired,
//   debug: PropTypes.bool.isRequired,
// };

export default SlideProudly;
