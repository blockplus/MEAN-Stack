
import React from 'react';

const SlideGirls = () => {
  return (
    <section className="section2" id="section2">
       <div className="container">
          <div className="row">
             <div className="col-md-7">
                <ul>
                   <li><img src="img/icon1.png" alt="" />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas ligula nibh, </li>
                   <li><img src="img/icon2.png" alt="" />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas ligula nibh, </li>
                   <li><img src="img/icon3.png" alt="" />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas ligula nibh, </li>
                   <li><img src="img/icon4.png" alt="" />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas ligula nibh, </li>
                </ul>
                <div className="appImg">
                  <a href="#">
                    <img src="img/app1.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="img/app2.png" alt="" />
                  </a>
                </div>
             </div>
             <div className="col-md-5">
                <div className="mImg2">
                  <img src="img/mobile-img2.png" alt="" />
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

export default SlideGirls;
