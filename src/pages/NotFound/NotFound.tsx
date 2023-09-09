import './NotFound.scss';
import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <div className="notFound">
      <h1 className="notFound__title">404 - Page Not Found</h1>

      <p className="notFound__message">
        Oops! The page you are looking for does not exist
      </p>
    </div>
  );
};
