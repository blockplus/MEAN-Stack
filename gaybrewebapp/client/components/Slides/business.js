import React from 'react';
import businessMobile from './img/business_mobile.png';

const SlideBusiness = () => {
  return (
    <section className="section3" id="section3">
       <div className="container">
          <div className="row">
             <div className="col-md-5">
                <div className="mImg1">
                  <img src={businessMobile} alt="" />
                </div>
             </div>
             <div className="col-md-7">
                <h2>Gaybre for Business</h2>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. egestas ligula nibh, eget tempor dolor malesuada et. </h3>
                <ul>
                   <li>Lorem ipsum example point goes here</li>
                   <li>Lorem ipsum another point goes in this space</li>
                   <li>Providing lorem ipsum example appealing item</li>
                   <li>Customize your lorem ipsum and add your own example point lorem ipsum</li>
                   <li>Premium Lorem ipsum example point to drive sales for business owners who rule.</li>
                </ul>
                <div className="text-center">
                  <a href="#" className="btn btn-primary">PRICING</a>
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

export default SlideBusiness;
