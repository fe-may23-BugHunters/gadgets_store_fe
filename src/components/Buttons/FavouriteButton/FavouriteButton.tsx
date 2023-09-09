import React, { useState } from 'react';
import cn from 'classnames';
import './FavouriteButton.scss';
import likeBtn from '../../../assets/icons/likeBtn.svg';
import likeBtnRed from '../../../assets/icons/likeBtnRed.svg';

export const FavouriteButton: React.FC = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <button
      type="button"
      className={cn('favBtn', {
        'favBtn--active': isFavourite,
      })}
      onClick={() => setIsFavourite(!isFavourite)}
    >
      {isFavourite ? (
        <img className="favBtn__icon" src={likeBtnRed} alt="likeBtnRed" />
      ) : (
        <img className="favBtn__icon" src={likeBtn} alt="likeBtn" />
      )}
    </button>
  );
};
