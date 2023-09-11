import React from 'react';
import './Menu.scss';
import { HeaderLinks } from '../../types/product';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import CloseImg from '../../assets/icons/Close.svg';
import { WideBtn } from '../WideBtn';
import { HeaderBtn } from '../Header/HeaderBtn';
import HeartImg from '../../assets/icons/heart.svg';
import CartImg from '../../assets/icons/Cart.svg';
import ProfileImg from '../../assets/icons/profile.svg';
import { CartContext } from '../../context/CartContext';
import { FavouriteContext } from '../../context/FavouriteContext';

interface Props {
  openMenu: () => void;
  links: HeaderLinks[];
  isAuth: boolean;
}

export const Menu: React.FC<Props> = ({ openMenu, links, isAuth }) => {
  const { totalFavouritesAmount } = React.useContext(FavouriteContext);
  const { totalCartAmount } = React.useContext(CartContext);

  return (
    <aside className="menu">
      <div className="menu__top">
        <div className="menu__header">
          <div
            className="menu__logo"
            role='btn'
            onClick={openMenu}
          >
            <Logo />
          </div>

          <button className="menu__closeBtn" onClick={openMenu}>
            <img
              className="menu__closeBtn-img"
              src={CloseImg}
              alt="Close menu icon"
            />
          </button>
        </div>

        <nav className="menu__nav">
          <ul className="menu__list">
            {links.map((link) => (
              <li className="menu__item" key={link.title}>
                <NavLink
                  to={link.path}
                  className="menu__link"
                  onClick={openMenu}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}

            {!isAuth && (
              <li className="menu__item">
                <div
                  className="menu__signInBtn"
                  role='btn'
                  onClick={openMenu}
                >
                  <WideBtn mainTitle={'Sign In'} />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="menu__buttons">
        {isAuth && (
          <div
            className="menu__btn menu__profile-btn"
            role='btn'
            onClick={openMenu}
          >
            <HeaderBtn path={'/profile'} icon={ProfileImg} />
          </div>
        )}

        <div
          className="menu__btn menu__favourite-btn"
          role='btn'
          onClick={openMenu}
        >
          <HeaderBtn
            path={'/favourites'}
            badge={totalFavouritesAmount}
            icon={HeartImg}
          />
        </div>

        <div
          className="menu__btn menu__cart-btn"
          role='btn'
          onClick={openMenu}
        >
          <HeaderBtn path={'/cart'} badge={totalCartAmount} icon={CartImg} />
        </div>
      </div>
    </aside>
  );
};
