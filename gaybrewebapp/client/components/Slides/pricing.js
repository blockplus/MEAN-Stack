import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectPlan } from '../../actions/plans';
import { stripeOpenPaymentDialog } from '../../actions/stripe';
import { showPopup } from '../../actions/popup';
import classnames from 'classnames';
import style from './Slides.scss';
import cookie from 'cookie';

const plansList = [
  {
    id: 'ONELOCATION',
    locations: 1,
    name: 'One Location',
    price: 19.99,
    trial_period: 'No trial',
    statement_description: 'Gaybre Pro Account',
  },
  {
    id: 'THREELOCATIONS',
    name: 'Three Locations',
    locations: 3,
    price: 54.99,
    trial_period: 'No trial',
    statement_description: 'Gaybre Pro Account 3Pk',
  },
  {
    id: 'SIXLOCATIONS',
    name: 'Six Locations',
    locations: 6,
    price: 99.99,
    trial_period: 'No trial',
    statement_description: 'Gaybre Pro Account 6pk',
  },
];

class PlanPricing extends Component {
  static propTypes = {
    isPlanSelected: PropTypes.bool.isRequired,
    choosePlan: PropTypes.func.isRequired,
    selectedPlan: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isPlanSelected: false,
  }

  render() {
    const { locations: selectedPlanLocations } = this.props.selectedPlan;
    return (
      <section className="section4" id="section4">
         <div className="container">
           <div className="row">
              {plansList.map((plan, index) => {
                const { locations, price } = plan;
                const plansClassName = classnames({
                  [style.selectedPlan]: selectedPlanLocations && selectedPlanLocations === locations,
                  [style.isNotSelectedPlan]: selectedPlanLocations && selectedPlanLocations !== locations,
                  priceBox: true,
                });
                return (
                  <div className="col-md-4" key={index}>
                     <div className={plansClassName}>
                        <h3>{ locations } LOCATION</h3>
                        <h4><sup>$</sup>{ price }<sub>/MO</sub></h4>
                        <h5>billed monthly.</h5>
                        <a href="#nowhere" className="btn signUpOpen" onClick={() => this.props.choosePlan(plan)}>JOIN</a>
                     </div>
                  </div>
                );
              })}
            </div>
         </div>
      </section>
    );
  }
}


const mapStateToProps = ({ plans }) => {
  return {
    selectedPlan: plans,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    choosePlan(data) {
      const { user_token: token } = cookie.parse(document.cookie);
      dispatch(selectPlan(data));
      if (token) {
        dispatch(stripeOpenPaymentDialog());
      } else {
        dispatch(showPopup('signup'));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanPricing);
