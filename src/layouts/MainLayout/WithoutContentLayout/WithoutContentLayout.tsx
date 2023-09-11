import React from 'react';
import { WideBtn } from '../../../components/WideBtn';
import { NavLink } from 'react-router-dom';
import './WithoutContentLayout.scss';

interface Props {
  title: string;
  icon: string;
  btnPath?: string;
  btnText?: string;
}

export const WithoutContentLayout: React.FC<Props> = ({
  title,
  icon,
  btnPath = '/',
  btnText = 'Go shopping',
}) => {
  return (
    <div className="withoutContent">
      <h2 className="withoutContent__title">{title}</h2>

      <div className="withoutContent__icon">
        <img className="withoutContent__img" src={icon} alt="icon" />
      </div>

      <NavLink to={btnPath} className="withoutContent__backBtn">
        <WideBtn mainTitle={btnText} />
      </NavLink>
    </div>
  );
};
