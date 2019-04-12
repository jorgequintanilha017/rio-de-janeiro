import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = props => (
  <header className="header">
    <div
      aria-label="Open menu"
      role="button"
      className="header__burger"
      onClick={props.onClick}
      onKeyPress={props.onClick}
      tabIndex="1"
    >
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </div>
    <h1 className="header__title">{props.title}</h1>
  </header>
);

Header.proptypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Header;
