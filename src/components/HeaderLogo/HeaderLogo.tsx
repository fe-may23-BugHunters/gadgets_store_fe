import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import './HeaderLogo.scss';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="headerLogo">
      <NavLink to="/home">
        <img className="headerLogo__img" src={logo} alt="Nice gadgets logo" />
      </NavLink>
    </div>
  );
};
