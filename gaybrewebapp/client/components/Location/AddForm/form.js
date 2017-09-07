import React, { PropTypes, Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import classnames from 'classnames';
import style from './AddForm.scss';
import TimeoutTransitionGroup from 'react-components/timeout-transition-group';
import WorkingHours from './working_hours';
import { default as shallowCompare } from 'react/lib/shallowCompare';

export const fields = [
  'name',
  'website',
  'streetaddress',
  'city',
  'state',
  'zip',
  'country',
  'phone',
  'details',
  'discounts[]',
  'couponSecond',
  'hours[].start',
  'hours[].end',
  'hours[].day',
  'category',
];

const validate = () => {
  const errors = {};
  // if (!values.email) {
  //   errors.email = 'Required';
  // }
  // if (!values.password) {
  //   errors.password = 'Required';
  // }
  // if (!values.name) {
  //   errors.name = 'Required';
  // }
  // if (values.password !== values.confirmPassword) {
  //   errors.confirmPassword = 'Not matched!';
  //   errors.password = 'Not matched!';
  // }
  // if (values.password && values.password.length < 5) {
  //   errors.password = 'Weak password';
  // }
  return errors;
};

export class AddLocationForm extends Component {
  static propTypes = {
    ...propTypes,
    onSubmit: PropTypes.func.isRequired,
    deleteLocation: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { showWorkingHours: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onClickWorkingHours = () => {
    this.setState(previousState => {
      return { showWorkingHours: !previousState.showWorkingHours };
    });
  }

  render() {
    const {
      fields: {
        name,
        website,
        streetaddress,
        city,
        state,
        zip,
        details,
        phone,
        country,
        hours,
        discounts,
        category,
      },
      handleSubmit,
      added,
      errors,
      submitFailed,
      isRegisterError,
      idLocation,
      deleteLocation
    } = this.props;
    return (
      <div className="locationForm">
        <form onSubmit={handleSubmit} className={classnames({ [style.formError]: isRegisterError })}>
          <div className="row">
            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Business Name" {...name} />
              </div>
            </div>
            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Website" {...website} />
              </div>
            </div>
            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Category" {...category} />
              </div>
            </div>
            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Address" {...streetaddress} />
              </div>
            </div>

            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Phone" {...phone} />
              </div>
            </div>
            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <input
                  onClick={() => this.onClickWorkingHours()}
                  type="button" className="form-control" value="Working Hours"
                />

                <div className={style.workHoursLayout}>
                  <TimeoutTransitionGroup
                    transitionName={'popup-animation'}
                    enterTimeout={1000} leaveTimeout={1000}
                  >
                    {this.state.showWorkingHours &&
                      <WorkingHours
                        field={hours}
                        saveHandle={this.onClickWorkingHours}
                      />
                    }
                  </TimeoutTransitionGroup>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="row">
                <div className="col-sm-4 col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Country" {...country} />
                  </div>
                </div>
                <div className="col-sm-4 col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="City" {...city} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="State" {...state} />
                  </div>
                </div>
                <div className="col-sm-4 col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="ZIP" {...zip} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="form-group col-md-6">
              <input type="text" className="form-control" placeholder="Add a coupon code" {...discounts[0]} />
            </div>
            <div className="form-group col-md-6">
              <input type="text" className="form-control" placeholder="Add a coupon code" {...discounts[1]} />
            </div>
            </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <textarea rows="2" className="form-control" placeholder="Description" {...details} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 text-left">
              <input type="button" onClick={() => deleteLocation(idLocation)} className="btn btn-primary" value="DELETE" />
            </div>
            <div className="col-md-7 text-left">
              <input type="submit" className="btn btn-primary"
                value={
                  `${added ? 'SAVE' : 'UPDATE'}`
                } />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ locations }, props) => {
  const { idLocation } = props;
  const [initialValues = {}] = locations.filter(el => el.id === idLocation);
  return {
    initialValues,
  };
};
export default reduxForm({
  form: 'locationForm',
  fields,
}, mapStateToProps)(AddLocationForm);
