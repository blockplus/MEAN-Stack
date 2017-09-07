import React from 'react';
import appStore from './img/appstore.png';
import googlePlay from './img/googleplay.png';
import mobile from './img/mobile.png';
import guys from './img/guys.jpg';

const SlideMain = () => {
  return (
    <section className="jumbotron">
       <div className="slideImg"><img src={guys} alt="" /></div>
       <div className="bannerCaption">
          <table width="100%" height="100%" border="0">
            <tbody>
               <tr>
                  <td>
                     <div className="container">
                        <div className="row">
                           <div className="col-md-5 col-md-push-7">
                              <div className="bannerMobile"><img src={mobile} alt="" /></div>
                           </div>
                           <div className="col-md-7 col-md-pull-5">
                              <div className="bannerText">
                                 <h2>Gaybre helps you find &amp; <br /> share gay-friendly places. </h2>
                                 <div className="bannerApp">
                                  <a href="#">
                                    <img src={appStore} alt="" />
                                  </a>
                                  <a href="#">
                                    <img src={googlePlay} alt="" />
                                  </a>
                                </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </td>
               </tr>
             </tbody>
          </table>
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

export default SlideMain;
