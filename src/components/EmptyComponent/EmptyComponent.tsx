/* eslint-disable */
import React from 'react';
import './EmptyComponent.scss';
import { WithoutContentLayout } from '../../layouts/MainLayout/WithoutContentLayout';

type Props = {
  data: any;
  children?: React.ReactNode;
  title: string;
  icon: string;
  btnPath?: string;
  btnText?: string;
};

export const EmptyComponent: React.FC<Props> = ({
  data,
  title,
  children,
  icon,
  btnPath,
  btnText,
}) => {
  if (data === null || (data && !data.length)) {
    return (
      <WithoutContentLayout
        title={title}
        icon={icon}
        btnPath={btnPath}
        btnText={btnText}
      />
    );
  }

  return <>{children}</>;
};
