import React, { ReactNode } from 'react';
import './MainLayout.scss';
import '../../styles/blocks/_container.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

interface Props {
  children: ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="page">
      <Header />

      <main className="page__content">
        <div className="container">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
