import React from 'react';
import cn from 'classnames';
import './PhotoPreviewItem.scss';

interface Props {
  isActive: boolean;
  photo: string;
  showPhoto: (value: string) => void;
}

export const PhotoPreviewItem: React.FC<Props> = ({
  isActive,
  photo,
  showPhoto = () => {},
}) => {
  return (
    <button
      type="button"
      className={cn('photo', {
        'photo--active': isActive,
      })}
      onClick={() => showPhoto(photo)}
    >
      <img
        className="photo__img"
        src={`${location.origin}/gadgets_store_fe/${photo}`}
        alt="preview product photo"
      />
    </button>
  );
};
