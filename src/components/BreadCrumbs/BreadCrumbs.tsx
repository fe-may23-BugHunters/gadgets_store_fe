import React from 'react';
import './BreadCrumbs.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/icons/arrowRight.svg';
import home from '../../assets/icons/Home.svg';

interface Props {
  pathname: string;
  productTitle?: string;
  onPathChange: (newPath: string) => void;
}

export const BreadCrumbs: React.FC<Props> = ({ pathname, productTitle }) => {
  const links = pathname.split('/').filter((link) => link !== '');

  if (productTitle) {
    links.pop();
    links.push(productTitle);
  }

  return (
    <nav className="breadCrumbs">
      <ul className="breadCrumbs__list">
        <li className="breadCrumbs__item">
          <Link to="/" className="breadCrumbs__home-link">
            <img src={home} alt="home" className="breadCrumbs__image" />
          </Link>
        </li>

        {links.map((link, index) => {
          const title = link.split('-').join(' ');

          return (
            <li key={link} className="breadCrumbs__item">
              <Arrow className="breadCrumbs__image" />

              <Link
                to={`/${link}`}
                className={cn('breadCrumbs__link', {
                  'breadCrumbs__link--disabled': index === links.length - 1,
                })}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
