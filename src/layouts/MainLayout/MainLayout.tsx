import React, { ReactNode, useEffect } from 'react';
import cn from 'classnames';
import './MainLayout.scss';
import '../../styles/blocks/_container.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Menu } from '../../components/Menu';

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
  const [isAuth] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body')?.classList.add('disabled-scroll');
    } else {
      document.querySelector('body')?.classList.remove('disabled-scroll');
    }
  }, [isMenuOpen]);

  return (
    <div
      className={cn('page', {
        'page--disabled-scroll': isMenuOpen,
      })}
    >
      <Header
        isAuth={isAuth}
        links={links}
        openMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <Menu
          openMenu={() => setIsMenuOpen(false)}
          links={links}
          isAuth={isAuth}
        />
      )}

      <main className="page__content">
        <div className="container">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
