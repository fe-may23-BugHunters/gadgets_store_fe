import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import './Header.scss';
import { Logo } from '../Logo';
import HeartImg from '../../assets/icons/heart.svg';
import CartImg from '../../assets/icons/Cart.svg';
import ProfileImg from '../../assets/icons/profile.svg';
import MenuImg from '../../assets/icons/Menu.svg';
import { HeaderBtn } from './HeaderBtn';
import { WideBtn } from '../WideBtn';
import { FavouriteContext } from '../../context/FavouriteContext';
import { CartContext } from '../../context/CartContext';
import { HeaderLinks } from '../../types/product';

interface Props {
  links: HeaderLinks[];
  openMenu: () => void;
}

export const Header: React.FC<Props> = ({ links, openMenu }) => {
  const { totalFavouritesAmount } = useContext(FavouriteContext);
  const { totalCartAmount } = useContext(CartContext);
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return (
    <header className="header">
      <div className="header__rightPart">
        <div className="header__logo">
          <Logo />
        </div>

        <nav className="header__nav">
          <ul className="header__list">
            {links.map((link) => (
              <li className="header__item" key={link.title}>
                <NavLink to={link.path} className="header__link">
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {!isAuthenticated && (
            <div
              className="header__signInBtn"
              role='btn'
              onClick={() => loginWithRedirect()}
            >
              <WideBtn mainTitle={'Sign In'} />
            </div>
          )}
        </nav>
      </div>

      <div className="header__leftPart">
        <button className="header__menu-burger" onClick={openMenu}>
          <img
            className="headerBtn__menu-img"
            src={MenuImg}
            alt="Menu icon"
          />
        </button>

        <div className="header__buttons">
          {isAuthenticated && (
            <div className="header__profile-btn">
              <HeaderBtn path={'/profile'} icon={ProfileImg} />
            </div>
          )}

          <div className="header__favourite-btn">
            <HeaderBtn
              path={'/favourites'}
              badge={totalFavouritesAmount}
              icon={HeartImg}
            />
          </div>

          <div className="header__cart-btn">
            <HeaderBtn
              path={'/cart'}
              badge={totalCartAmount}
              icon={CartImg}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
