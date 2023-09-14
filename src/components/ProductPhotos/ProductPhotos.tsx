import React, { useState, useCallback, useEffect } from 'react';
import './ProductPhotos.scss';
import { PhotoPreviewItem } from '../PhotoPreviewItem';

interface Props {
  photos: string[];
}

export const ProductPhotos: React.FC<Props> = ({ photos }) => {
  const [largePhoto, setLargePhoto] = useState<string>(photos[0]);

  useEffect(() => {
    setLargePhoto(photos[0]);
  }, [photos]);

  const changeLargePhoto = useCallback(
    (newPhoto: string) => {
      setLargePhoto(newPhoto);
    },
    [largePhoto],
  );

  return (
    <section className="photos">
      <div className="photos__photo">
        <img
          className="photos__img"
          src={`${location.origin}/${largePhoto}`}
          alt="product photo"
        />
      </div>

      <div className="photos__list">
        {photos.slice(0, 5).map((smallPhoto) => (
          <PhotoPreviewItem
            isActive={largePhoto === smallPhoto}
            photo={smallPhoto}
            key={smallPhoto}
            showPhoto={changeLargePhoto}
          />
        ))}
      </div>
    </section>
  );
};
