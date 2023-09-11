import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';
import { Loader } from '../components/Loader';

interface Props {
  children: React.ReactNode;
}

export const AuthMiddleWare: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
};
