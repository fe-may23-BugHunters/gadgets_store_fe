import React from 'react';
import './Loader.scss';
type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
};

export const Loader: React.FC<Props> = ({ isLoading, children }) => {
  React.useEffect(() => {
    if (isLoading) {
      document.querySelector('body')?.classList.add('disabled-scroll');
    } else {
      document.querySelector('body')?.classList.remove('disabled-scroll');
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="spinner__bg">
          <div className="spinner__item" />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
