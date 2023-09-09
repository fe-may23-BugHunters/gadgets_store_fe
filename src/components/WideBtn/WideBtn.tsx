import React from 'react';
import './WideBtn.scss';
import cn from 'classnames';
import { Product } from '../../types/product';
import { CartContext } from '../../context/CartContext';

interface Props {
  product?: Product;
  mainTitle: string;
  secondaryTitle?: string;
}

export const WideBtn: React.FC<Props> = ({
  product,
  mainTitle,
  secondaryTitle = '',
}) => {
  const { cartProducts, addCartProduct, removeCartProduct }
    = React.useContext(CartContext);

  const isAddedToCart = React.useMemo(() => {
    return cartProducts.some((cartProduct) => cartProduct.id === product?.id);
  }, [product, cartProducts]);

  return (
    <button
      className={cn('wideBtn', {
        'wideBtn--isDoubleTitle': isAddedToCart,
        'wideBtn--active': isAddedToCart,
      })}
      onClick={() => {
        if (isAddedToCart && product) {
          removeCartProduct(product?.id);
        } else if (product) {
          addCartProduct(product);
        }
      }}
    >
      {isAddedToCart && secondaryTitle ? secondaryTitle : mainTitle}
    </button>
  );
};
