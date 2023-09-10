import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderBtn.scss';

interface Props {
  path: string,
  icon: string,
  badge?: number,
}

export const HeaderBtn:React.FC<Props> = ({
  path,
  icon,
  badge,
}) => {
  const hasProducts = React.useMemo(() => {
    return Boolean(badge && badge > 0);
  }, [badge]);

  return (
    <NavLink to={path} className="headerBtn">
      <img
        className="headerBtn__img"
        src={icon}
        alt={path}
      />
      {hasProducts && (
        <span className="headerBtn__badge">{badge}</span>
      )}
    </NavLink>
  );
};
