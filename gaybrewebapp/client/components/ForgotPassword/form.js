import React, { PropTypes, Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import classnames from 'classnames';
import style from './ForgotPassword.scss';

export const fields = ['email'];
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

class ForgotPasswordBox extends Component {
  static propTypes = {
    ...propTypes,
    showSignin: PropTypes.func.isRequired,
    isSigninError: PropTypes.bool.isRequired,
  }
  render() {
    const {
      fields: { email },
      handleSubmit,
      errors,
      values: {
        email: emailValue,
      },
      submitFailed,
      isSigninError,
      showSignin,
    } = this.props;
    const { email: emailError } = errors;
    return (
      <div
        className="loginPop popup-container"
        id="loginPop"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog" role="document">
          <form
            onSubmit={handleSubmit}
            className={classnames({
              [style.formError]: isSigninError,
            })
          }>
            <div className="modal-content">
              <div className="modal-body">
                <div className={
                  classnames({
                    'form-group': true,
                    'has-error': emailError !== undefined && (submitFailed || emailValue !== undefined),
                  })
                }>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    {...email}
                  />
                </div>
                <div className="form-group clearfix">
                  <input
                    type="submit"
                    className="btn btn-primary pull-left"
                    value="RESET PASSWORD"
                  />
                  <a
                    className="pull-right forGot"
                    onClick={showSignin}
                  >
                    Back to login form
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'forgotPasswordForm',
  fields,
  validate,
})(ForgotPasswordBox);
