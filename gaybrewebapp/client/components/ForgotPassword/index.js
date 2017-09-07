import { connect } from 'react-redux';
import SignupForm from './form';
import { showPopup } from '../../actions/popup';
import { resetPassword } from '../../actions/user';

const mapDispatchToProps = (dispatch) => {
  return {
    showSignin() {
      dispatch(showPopup('signin'));
    },
    onSubmit() {
      dispatch(resetPassword());
      return false;
    },
  };
};
const SignupBox = connect(
  null,
  mapDispatchToProps
)(SignupForm);

export default SignupBox;
