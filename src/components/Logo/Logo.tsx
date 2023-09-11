import React from 'react';
import { NavLink } from 'react-router-dom';
import './Logo.scss';
import logo from '../../assets/Logo.svg';

export const Logo: React.FC = () => {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__img" src={logo} alt="logo" />
    </NavLink>
  );
};
