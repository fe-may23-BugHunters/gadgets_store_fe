import React from 'react';
import './NotFound.scss';
import notFoundImg from '../../assets/icons/notFound.png';
import { WithoutContentLayout } from '../../layouts/WithoutContentLayout';

export const NotFound: React.FC = () => {
  return (
    <div className="notFound">
      <WithoutContentLayout
        title={"Oops, this page doesn't exist..."}
        icon={notFoundImg}
        btnText={'Back to home'}
      />
    </div>
  );
};
