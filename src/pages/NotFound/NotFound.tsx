// eslint-disable-next-line max-len
import { WithoutContentLayout } from '../../layouts/MainLayout/WithoutContentLayout';
import './NotFound.scss';
import React from 'react';
import notFoundImg from '../../assets/icons/notFound.png';

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
