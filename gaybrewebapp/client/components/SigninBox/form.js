import React, { PropTypes, Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import classnames from 'classnames';
import style from './SigninBox.scss';

export const fields = ['email', 'password'];
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (values.password && values.password.length < 5) {
    errors.password = 'Weak password';
  }
  return errors;
};

class SigninBox extends Component {
  static propTypes = {
    ...propTypes,
    showSignup: PropTypes.func.isRequired,
    showResetPassword: PropTypes.func.isRequired,
    isSigninError: PropTypes.bool.isRequired,
  }
  render() {
    const {
      fields: { email, password },
      handleSubmit,
      errors,
      values: {
        email: emailValue,
        password: passwordValue,
      },
      submitFailed,
      isSigninError,
      showSignup,
      showResetPassword,
    } = this.props;
    const { password: passError, email: emailError } = errors;
    return (
      <div className="loginPop popup-container" id="loginPop" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <form onSubmit={handleSubmit} className={classnames({ [style.formError]: isSigninError })}>
            <div className="modal-content">
              <div className="modal-body">
                <div className={classnames({ 'form-group': true, 'has-error': emailError !== undefined && (submitFailed || emailValue !== undefined) })}>
                  <input type="email" className="form-control" placeholder="Email" {...email} />
                </div>
                <div className={classnames({ 'form-group': true, 'has-error': passError !== undefined && (submitFailed || passwordValue !== undefined) })}>
                  <input type="password" className="form-control" placeholder="Password" {...password} />
                </div>
                <div className="form-group clearfix">
                  <input type="submit" className="btn btn-primary pull-left" value="SIGN IN" />
                  <a className="pull-right forGot" onClick={showResetPassword}>Forgot Password?</a>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={showSignup}>SIGN UP</button>
                <button type="button" className="btn btn-danger">Sign in with Google</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'signinForm',
  fields,
  validate,
})(SigninBox);
