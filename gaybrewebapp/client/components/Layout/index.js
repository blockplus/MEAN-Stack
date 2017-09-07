import React, { PropTypes } from 'react';
import style from './Layout.scss';

function Layout({ children }) {
  return (
    <div className={style.Layout}>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
