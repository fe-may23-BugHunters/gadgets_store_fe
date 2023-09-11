import React from 'react';
import './CartModal.scss';
import { WideBtn } from '../WideBtn';
import { NavLink } from 'react-router-dom';
import { getCurrentTime } from '../../helpers/products';

interface Props {
  handleClick: () => void;
}

export const CartModal: React.FC<Props> = ({ handleClick }) => {
  const orderDate = getCurrentTime();

  return (
    <div className="cartModal">
      <div className="cartModal__content">
        <h2 className="cartModal__title">Thank you for your order!</h2>

        <p className="cartModal__orderNumber">Order number: 487-FG4-48</p>

        <p className="cartModal__orderDate">Order date: {orderDate}</p>

        <NavLink to="/" className="cartModal__backBtn" onClick={handleClick}>
          <WideBtn mainTitle="Back to Store" />
        </NavLink>
      </div>
    </div>
  );
};
