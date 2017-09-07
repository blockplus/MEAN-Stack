import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import style from './Header.scss';
import Link from '../Link';
import Logo from './img/logo.png';
import classnames from 'classnames';
import { showPopup } from '../../actions/popup';

class Header extends Component {
  static propTypes = {
    showLoginPopup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user = {} } = this.props;
    const { email } = user;
    return (
      <header className="single-page-nav">
       <nav className={`${style.navbar} ${style.navbarDef} navbar-default`}>
          <div className={classnames({ [style.container]: true, container: true })}>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className={classnames({ 'navbar-brand': true, external: true, [style.navbarBrand]: true })} href="index.html">
                <img src={Logo} alt="" />
              </a>
              <span className={style.logoText}>be really extraordinary.</span>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className={classnames({
                [style.navbarNav]: true,
                nav: true,
                'navbar-right': true,
                'navbar-nav': true,
              })}>
                <li><a href="/" onClick={Link.handleClick}>ABOUT</a></li>
                <li><a href="/features" onClick={Link.handleClick}>FEATURES</a></li>
                <li><a href="/for_business" onClick={Link.handleClick}>FOR BUSINESS</a></li>
                <li>
                  {!email && <a className="external" data-toggle="modal" onClick={() => this.props.showLoginPopup('signin')}>LOGIN</a>}
                  {email && <a className={classnames({ external: true, [style.userName]: true })} data-toggle="modal">Hello, {email}</a>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ showLoginPopup: popupType => dispatch(showPopup(popupType)) });
const mapStateToProps = ({ user }) => {
  return { user };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
