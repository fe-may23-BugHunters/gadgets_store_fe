import React, { useEffect } from 'react';
import './styles/main.scss';
import { MainLayout } from './layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import { usePathname } from './hooks/usePathname';
import { useScrollUp } from './hooks/useScrollUp';

const App: React.FC = () => {
  const { pathname } = usePathname();
  const { handleScrollUp } = useScrollUp();

  useEffect(() => {
    handleScrollUp();
  }, [pathname]);

  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default App;
