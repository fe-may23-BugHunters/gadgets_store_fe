import React, { useContext } from 'react';
import cn from 'classnames';
import './LikeBtn.scss';
import HeartImg from '../../assets/icons/heart.svg';
import RedHeartImg from '../../assets/icons/heartRed.svg';
import { Product } from '../../types/product';
import { FavouriteContext } from '../../context/FavouriteContext';
import {
  createFavouriteProduct,
  deleteFavouriteProduct,
} from '../../api/favourites';

type Props = {
  product?: Product;
};

export const LikeBtn: React.FC<Props> = ({ product }) => {
  const { favouriteProducts, addFavouriteProduct, removeFavouriteProduct }
    = useContext(FavouriteContext);

  const isFavourite = React.useMemo(() => {
    return favouriteProducts.find((item) => item.id === product?.id);
  }, [product, favouriteProducts.length]);

  const onAdd = () => {
    createFavouriteProduct({
      productId: product?.id as string,
    })
      .then(() => {
        addFavouriteProduct(product as Product);
      })
      .catch(() => {
        throw new Error('Product is not removed from favorites');
      });
  };

  const onRemove = () => {
    deleteFavouriteProduct({
      productId: product?.id as string,
    })
      .then(() => {
        removeFavouriteProduct(product?.id as string);
      })
      .catch(() => {
        throw new Error('Product is not added to favorites');
      });
  };

  return (
    <button
      className={cn('likeBtn', {
        'likeBtn--active': isFavourite,
      })}
      onClick={() => {
        if (isFavourite && product) {
          onRemove();
        } else if (product) {
          onAdd();
        }
      }}
    >
      <img src={isFavourite ? RedHeartImg : HeartImg} alt="Favourite button" />
    </button>
  );
};
