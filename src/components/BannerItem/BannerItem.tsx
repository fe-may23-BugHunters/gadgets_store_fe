import React from 'react';
import './BannerItem.scss';

interface Props {
  banner: string;
}

export const BannerItem: React.FC<Props> = ({ banner }) => {
  return (
    <div className="bannerItem">
      <img
        className="bannerItem__img"
        src={`${location.origin}/gadgets_store_fe/${banner}`}
        alt="Banner"
      />
    </div>
  );
};
