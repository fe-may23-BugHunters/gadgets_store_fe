import React from 'react';
import './OrderItem.scss';
import { NavLink } from 'react-router-dom';
import { normalizedTime } from '../../helpers/products';
import { Order } from '../../types/product';

interface Props {
  order: Order;
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <article className="order" key={order.id}>
      <div className="order__header">
        <div className="order__col">
          Order ID:

          <span className="order__value">
            {order.id.slice(0, 7)}
          </span>
        </div>
        <div className="order__col">
          Total items:

          <span className="order__value">
            {order.totalItems}
          </span>
        </div>
        <div className="order__col">
          Date:

          <span className="order__value">
            {normalizedTime(order.createdAt)}
          </span>
        </div>
        <div className="order__col">
          Total price:

          <span className="order__value order__totalPrice">
            {`$${order.price}`}
          </span>
        </div>
      </div>

      <ul className="order__list">
        {order.products.map(product => (
          <li className="order__item" key={product.productId}>
            <NavLink
              to={`/${product.category}/${product.productId}`}
              className="order__link"
            >
              <div className="order__productInfo">
                <p className="order__count">{`x${product.quantity}`}</p>
                <p className="order__productName">{product.name}</p>
              </div>

              <p className="order__productPrice">{`$${product.price}`}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </article>
  );
};
