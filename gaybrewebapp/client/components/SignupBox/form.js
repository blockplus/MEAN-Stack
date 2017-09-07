import React, { PropTypes, Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import classnames from 'classnames';
import style from './SignupBox.scss';

export const fields = ['email', 'password', 'confirmPassword', 'name'];
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Not matched!';
    errors.password = 'Not matched!';
  }
  if (values.password && values.password.length < 5) {
    errors.password = 'Weak password';
  }
  return errors;
};
export class SignupForm extends Component {
  static propTypes = {
    ...propTypes,
    show: PropTypes.func.isRequired,
    showSignin: PropTypes.func.isRequired,
    isRegisterError: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  render() {
    const {
      showSignin,
      fields: { email, password, confirmPassword, name },
      handleSubmit,
      errors,
      values: {
        email: emailValue,
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
        name: nameValue,
      },
      submitFailed,
      isRegisterError,
    } = this.props;
    const { password: passError, email: emailError, confirmPassword: confirmPasswordError, name: nameError } = errors;
    return (
        <div className="signUpBox popup-container">
          <div className="modal-dialog" role="document">
            <form onSubmit={handleSubmit} className={classnames({ [style.formError]: isRegisterError })}>
              <div className="modal-content">
                <div className="modal-body">
                  <div className={classnames({ 'form-group': true, 'has-error': emailError !== undefined && (submitFailed || emailValue !== undefined) })}>
                    <input type="email" className="form-control" placeholder="Email" {...email} />
                  </div>
                  <div className={classnames({ 'form-group': true, 'has-error': nameError !== undefined && (submitFailed || nameValue !== undefined) })}>
                    <input type="text" className="form-control" placeholder="Name" {...name} />
                  </div>
                  <div className={classnames({ 'form-group': true, 'has-error': passError !== undefined && (submitFailed || passwordValue !== undefined) })}>
                    <input type="password" className="form-control" placeholder="Password" {...password} />
                  </div>
                  <div className={classnames({ 'form-group': true, 'has-error': confirmPasswordError !== undefined && (submitFailed || confirmPasswordValue !== undefined) })}>
                    <input type="password" className="form-control" placeholder="Confirm Password" {...confirmPassword} />
                  </div>
                </div>
                <div className="modal-footer">
                  <input type="submit" className="btn btn-primary pull-left" value="Join" />
                  <a onClick={showSignin} className="pull-right forGot" href="#">Already have accout?</a>
                </div>
              </div>
            </form>
          </div>
        </div>

    );
  }
}

export default reduxForm({
  form: 'signupForm',
  fields,
  validate,
})(SignupForm);
