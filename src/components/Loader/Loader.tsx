import React from 'react';
import './Loader.scss';
type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
};

export const Loader: React.FC<Props> = ({ isLoading, children }) => {
  return <>{isLoading ? <div className="spinner" /> : <>{children}</>}</>;
};
