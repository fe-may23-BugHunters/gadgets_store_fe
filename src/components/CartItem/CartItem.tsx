import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './CartItem.scss';
import cn from 'classnames';
import { ReactComponent as CloseImg } from '../../assets/icons/Close.svg';
import { ReactComponent as PlusImg } from '../../assets/icons/Plus.svg';
import { ReactComponent as MinusImg } from '../../assets/icons/Minus.svg';
import { CartItemAction, ProductWithCount } from '../../types/product';
import { CartContext } from '../../context/CartContext';

type Props = {
  cartProduct: ProductWithCount;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { removeCartProduct, changeCount } = useContext(CartContext);

  return (
    <>
      {!cartProduct ? (
        <h3>Product not found</h3>
      ) : (
        <article className="cartItem">
          <div className="cartItem__row">
            <button
              className="cartItem__remove"
              onClick={() => removeCartProduct(cartProduct.id)}
            >
              <CloseImg className="cartItem__closeIcon" />
            </button>

            <NavLink
              to={`/${cartProduct.category}/${cartProduct.id}`}
              className="cartItem__imageBlock"
            >
              <img
                src={`${location.origin}/product_catalog_fe/${cartProduct.images[0]}`}
                className="cartItem__image"
                alt={cartProduct.name}
              />
            </NavLink>

            <p className="cartItem__title">{cartProduct.name}</p>
          </div>

          <div className="cartItem__row">
            <div className="cartItem__count">
              <button
                className={cn('cartItem__decreaseBtn', {
                  cartItem__disabled: cartProduct.count <= 1,
                })}
                disabled={cartProduct.count <= 1}
                onClick={() =>
                  changeCount(cartProduct.id, CartItemAction.SUBTRACT)
                }
              >
                <MinusImg />
              </button>
              <span className="cartItem__amount">{cartProduct.count}</span>
              <button
                className={cn('cartItem__increase', {
                  cartItem__disabled: cartProduct.count >= 99,
                })}
                disabled={cartProduct.count >= 99}
                onClick={() => changeCount(cartProduct.id, CartItemAction.ADD)}
              >
                <PlusImg />
              </button>
            </div>

            <p className="cartItem__price">
              <span>{`$${
                cartProduct.priceDiscount || cartProduct.priceRegular
              }`}</span>
            </p>
          </div>
        </article>
      )}
    </>
  );
};
