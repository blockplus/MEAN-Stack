import { connect } from 'react-redux';
import SignupForm from './form';
import { showPopup } from '../../actions/popup';
import { signupUser } from '../../actions/user';

const mapStateToProps = ({ user }) => {
  return {
    isRegisterError: user.status === 'signup_failure',
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showSignin() {
      dispatch(showPopup('signin'));
    },
    onSubmit() {
      dispatch(signupUser());
      return false;
    },
  };
};
const SignupBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);

export default SignupBox;
