import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import cn from 'classnames';

import './LikeBtn.scss';

import { Product } from '../../types/product';
import { FavouriteContext } from '../../context/FavouriteContext';
import {
  createFavouriteProduct,
  deleteFavouriteProduct,
} from '../../api/favourites';
import { ModalLayout } from '../../layouts/ModalLayout';
import RedHeartImg from '../../assets/icons/heartRed.svg';
import LoginImg from '../../assets/icons/login.png';
import HeartImg from '../../assets/icons/heart.svg';

type Props = {
  product?: Product;
};

export const LikeBtn: React.FC<Props> = ({ product }) => {
  const { favouriteProducts, addFavouriteProduct, removeFavouriteProduct }
    = useContext(FavouriteContext);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isFavourite = React.useMemo(() => {
    return favouriteProducts.find((item) => item.id === product?.id);
  }, [product, favouriteProducts.length]);

  const onAdd = () => {
    if (!user?.sub) {
      return;
    }

    createFavouriteProduct({
      userId: user.sub,
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
    if (!user?.sub) {
      return;
    }

    deleteFavouriteProduct({
      userId: user.sub,
      productId: product?.id as string,
    })
      .then(() => {
        removeFavouriteProduct(product?.id as string);
      })
      .catch(() => {
        throw new Error('Product is not added to favorites');
      });
  };

  const handleModalClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }

    setIsModalOpen(false);
  };

  const handleClick = () => {
    if (!isAuthenticated && !isModalOpen) {
      setIsModalOpen(true);

      return;
    }

    if (isFavourite && product) {
      onRemove();
    } else if (product) {
      onAdd();
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalLayout
          title={'Please sign in'}
          icon={LoginImg}
          btnTitle={'Sign in'}
          closeModal={() => setIsModalOpen(false)}
          handleClick={handleModalClick}
        />
      )}
      <button
        className={cn('likeBtn', {
          'likeBtn--active': isFavourite,
        })}
        onClick={handleClick}
      >
        <img
          src={isFavourite ? RedHeartImg : HeartImg}
          alt="Favourite button"
        />
      </button>
    </>
  );
};
