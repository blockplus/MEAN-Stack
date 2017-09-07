import { showPopup } from '../../actions/popup';
import { connect } from 'react-redux';
import SigninForm from './form';
import { signinUser } from '../../actions/user';

const mapStateToProps = ({ user }) => {
  return {
    isSigninError: user.status === 'signin_failure',
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showSignup() {
      dispatch(showPopup('signup'));
    },
    showResetPassword() {
      dispatch(showPopup('forgot'));
    },
    onSubmit() {
      dispatch(signinUser());
      return false;
    },
  };
};

const SigninBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninForm);

export default SigninBox;
