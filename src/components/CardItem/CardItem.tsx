import React from 'react';
import './CardItem.scss';
import { NavLink } from 'react-router-dom';
import { WideBtn } from '../WideBtn';
import { LikeBtn } from '../LikeBtn';
import { Product } from '../../types/product';

interface Props {
  product: Product;
}

export const CardItem: React.FC<Props> = ({ product }) => {
  return (
    <article className="card">
      <NavLink
        to={`/${product?.category}/${product?.id}`}
        className="card__photo"
      >
        <img
          className="card__photo"
          src={`${location.origin}/gadgets_store_fe/${product?.images[0]}`}
          alt={product?.name}
        />
      </NavLink>

      <h2 className="card__title">{product?.name}</h2>
      <div className="card__price">
        {product.priceDiscount ? (
          <>
            <span className="card__price__now">${product?.priceDiscount}</span>
            <span className="card__price__old">${product?.priceRegular}</span>
          </>
        ) : (
          <span className="card__price__now">${product?.priceRegular}</span>
        )}
      </div>
      <span className="card__line" />

      <ul className="card__details">
        <li className="detail">
          <span className="detailTitle">Screen</span>
          <span className="detailValue">{product?.screen}</span>
        </li>
        <li className="detail">
          <span className="detailTitle">Capacity</span>
          <span className="detailValue">{product?.capacity}</span>
        </li>
        <li className="detail">
          <span className="detailTitle">RAM</span>
          <span className="detailValue">{product?.ram}</span>
        </li>
      </ul>

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
