import React from 'react';
import { NavLink } from 'react-router-dom';
import './Logo.scss';
import logo from '../../assets/Logo.svg';

export const Logo: React.FC = () => {
  return (
    <div className="logo">
      <NavLink to="/" className="logo_link">
        <img className="logo__img" src={logo} alt="logo" />
      </NavLink>
    </div>
  );
};
