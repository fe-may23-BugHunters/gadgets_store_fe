import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const CardSkeleton: React.FC = () => {
  return (
    <article className="card">
      <div className="card__photo">
        <div className="skeleton">
          <Skeleton height={'196px'} />
        </div>
      </div>

      <h2 className="card__title">
        <div className="skeleton">
          <Skeleton height={'42px'} style={{ lineHeight: '21px' }}/>
        </div>
      </h2>

      <ul className="card__details">
        <li className="card__detail">
          <div className="skeleton">
            <Skeleton width={'100%'} height={'70px'} />
          </div>
        </li>
      </ul>

      <div className="card__buttons">
        <div className="card__addToCartBtn">
          <div className="skeleton">
            <Skeleton height={'40px'}/>
          </div>
        </div>
      </div>
    </article>
  );
};
