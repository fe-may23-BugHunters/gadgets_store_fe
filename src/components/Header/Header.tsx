import React from 'react';
import { HeaderLogo } from '../HeaderLogo';
import { Navigation } from '../Navigation';
import { Buttons } from '../Buttons';

import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__left">
        <HeaderLogo />

        <Navigation />
      </div>

      <Buttons />
    </header>
  );
};
