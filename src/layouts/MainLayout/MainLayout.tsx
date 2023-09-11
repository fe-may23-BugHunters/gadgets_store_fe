/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useEffect } from 'react';
import cn from 'classnames';
import { useAuth0 } from '@auth0/auth0-react';

import './MainLayout.scss';
import '../../styles/blocks/_container.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Menu } from '../../components/Menu';
import { Loader } from '../../components/Loader';

const links = [
  { title: 'Home', path: '/' },
  { title: 'Phones', path: '/phones' },
  { title: 'Tablets', path: '/tablets' },
  { title: 'Accessories', path: '/accessories' },
];

interface Props {
  children: ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoading } = useAuth0();

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body')?.classList.add('disabled-scroll');
    } else {
      document.querySelector('body')?.classList.remove('disabled-scroll');
    }
  }, [isMenuOpen]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <div
      className={cn('page', {
        'page--disabled-scroll': isMenuOpen,
      })}
    >
      <Header
        links={links}
        openMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <Menu
          openMenu={() => setIsMenuOpen(false)}
          links={links}
        />
      )}

      <main className="page__content">
        <div className="container">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
