import React, { useState } from 'react';
import cn from 'classnames';
import './CartButton.scss';

export const CartButton: React.FC = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  return (
    <button
      type="button"
      className={cn('addToCart', {
        'addToCart--active': isAddedToCart,
      })}
      onClick={() => setIsAddedToCart(!isAddedToCart)}
    >
      {isAddedToCart ? 'Added' : 'Add to cart'}
    </button>
  );
};
