import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SignupBox from '../SignupBox';
import SigninBox from '../SigninBox';
import ForgotPassword from '../ForgotPassword';
import style from './popup.scss';
import { hidePopup } from '../../actions/popup';
import TimeoutTransitionGroup from 'react-components/timeout-transition-group';

class Popup extends Component {
  static propTypes = {
    popupType: PropTypes.string,
    show: PropTypes.bool.isRequired,
    handleHidePopup: PropTypes.func.isRequired,
    handleKeyupHidePopup: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('keyup', this.props.handleKeyupHidePopup);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.props.handleKeyupHidePopup);
  }

  keypressHidePopup = (e) => {
    this.props.handleHidePopup(e);
  }

  render() {
    const { popupType, handleHidePopup, show } = this.props;
    return (
      <TimeoutTransitionGroup transitionName={'popup-animation'} enterTimeout={1000} leaveTimeout={1000}>
        {show &&
          <div className={style.layout} onClick={handleHidePopup} key={'popup-animation'}>
            <TimeoutTransitionGroup transitionName={'popup-animation-anim'} enterTimeout={1000} leaveTimeout={1000}>
              {popupType === 'signup' && <SignupBox key={'signup'} />}
            </TimeoutTransitionGroup>
            <TimeoutTransitionGroup transitionName={'popup-animation-anim'} enterTimeout={1000} leaveTimeout={1000}>
              {popupType === 'signin' && <SigninBox key={'sigin'} />}
            </TimeoutTransitionGroup>
            <TimeoutTransitionGroup transitionName={'popup-animation-anim'} enterTimeout={1000} leaveTimeout={1000}>
              {popupType === 'forgot' && <ForgotPassword key={'forgot'} />}
            </TimeoutTransitionGroup>
          </div>
        }
      </TimeoutTransitionGroup>
    );
  }
}

const mapStateToProps = ({ popup }) => {
  const { show, popupType } = popup;
  return { show, popupType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleHidePopup(e) {
      const isLayout = e.target.className.includes(style.layout);
      if (!isLayout) return;
      dispatch(hidePopup());
    },
    handleKeyupHidePopup(e) {
      if (e.which === 27) {
        dispatch(hidePopup());
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
