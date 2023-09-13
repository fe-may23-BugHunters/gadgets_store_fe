import React from 'react';
import './CardItem.scss';

import { NavLink } from 'react-router-dom';
import { WideBtn } from '../WideBtn';
import { LikeBtn } from '../LikeBtn';
import { Product } from '../../types/product';

interface Props {
  product: Product;
}

export const CardItem: React.FC<Props> = ({
  product,
}) => {
  return (
    <article className="card">
      <NavLink
        to={`/${product?.category}/${product?.id}`}
        className="card__photo"
      >
        <img
          className="card__img"
          src={`${location.origin}/gadgets_store_fe/${product?.images[0]}`}
          alt={product?.name}
        />
      </NavLink>

      <div className="card__info">
        <h3 className="card__title">{product?.name}</h3>

        <p className="card__price">
          <span className="card__newPrice">
            {`$${product?.priceDiscount || product?.priceRegular}`}
          </span>

          {product.priceDiscount && (
            <span className="card__oldPrice">
              {`$${product?.priceRegular}`}
            </span>
          )}
        </p>

        <ul className="card__details">
          <li className="card__detail">
            <p className="card__detailTitle">Screen</p>
            <p className="card__detailValue">{product?.screen}</p>
          </li>
          <li className="card__detail">
            <p className="card__detailTitle">Capacity</p>
            <p className="card__detailValue">{product?.capacity}</p>
          </li>
          <li className="card__detail">
            <p className="card__detailTitle">RAM</p>
            <p className="card__detailValue">{product?.ram}</p>
          </li>
        </ul>
      </div>

      <div className="card__buttons">
        <div className="card__addToCartBtn">
          <WideBtn
            product={product}
            mainTitle="Add to cart"
            secondaryTitle="Added to cart"
          />
        </div>

        <div className="card__likeBtn">
          <LikeBtn product={product} />
        </div>
      </div>
    </article>
  );
};
