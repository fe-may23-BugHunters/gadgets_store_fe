import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import '../../styles/blocks/_container.scss';
import './Footer.scss';
import arrowUp from '../../assets/icons/arrowUp.svg';
import { useScrollUp } from '../../hooks/useScrollUp';

const footerLinks = [
  {
    title: 'Github',
    path: 'https://github.com/fe-may23-BugHunters',
    target: '_blank',
  },
  { title: 'Contacts', path: '/contacts', target: '_self' },
  { title: 'Rights', path: '/rights', target: '_self' },
];

export const Footer: React.FC = () => {
  const { handleScrollUp } = useScrollUp();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            <Logo />
          </div>

          <nav className="footer__footerNav footerNav">
            <ul className="footerNav__list">
              {footerLinks.map((link) => (
                <li key={link.title} className="footerNav__item">
                  <NavLink
                    to={link.path}
                    target={link.target}
                    className="footerNav__link"
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__moveUp" onClick={handleScrollUp}>
            <span className="footer__label">Back to top</span>
            <button type="button" className="footer__btn-wrapper">
              <img className="footer__btn" src={arrowUp} alt="arrowUp" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
