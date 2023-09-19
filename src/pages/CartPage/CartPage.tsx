import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './CartPage.scss';

import { CartItem } from '../../components/CartItem';
import { BtnBack } from '../../components/BtnBack';
import { WideBtn } from '../../components/WideBtn';
import { CartContext } from '../../context/CartContext';
import { Loader } from '../../components/Loader';
import { EmptyComponent } from '../../components/EmptyComponent';
import { ModalLayout } from '../../layouts/ModalLayout';

import BasketImg from '../../assets/icons/emptyBasket.png';
import LoginImg from '../../assets/icons/login.png';
import OrderImg from '../../assets/icons/order.png';
import { createOrder } from '../../api/orders';

export const CartPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const { cartProducts, totalPrice, totalCartAmount, clearCart }
    = useContext(CartContext);

  const handleModalClick = () => {
    if (isAuthenticated) {
      const products = cartProducts.map((product) => {
        return {
          quantity: product.count,
          productId: product.id,
        };
      });

      const order = {
        userId: user.sub,
        totalItems: totalCartAmount,
        totalPrice,
        products,
      };

      setIsLoading(true);

      createOrder(order)
        .then(() => {
          clearCart();
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      loginWithRedirect();
    }

    setIsModalOpen(false);
  };

  return (
    <section className="cart">
      {isModalOpen && (
        <ModalLayout
          title={
            isAuthenticated ? 'Thank you for your order!' : 'Please sign in'
          }
          icon={isAuthenticated ? OrderImg : LoginImg}
          btnTitle={!isAuthenticated ? 'Sign in' : undefined}
          closeModal={() => {
            if (isAuthenticated) {
              clearCart();
            }

            setIsModalOpen(false);
          }}
          handleClick={handleModalClick}
        />
      )}

      <div className="cart__btnBack">
        <BtnBack />
      </div>

      <Loader isLoading={isLoading}>
        <EmptyComponent
          data={cartProducts}
          title={'Looks like your cart is empty...'}
          icon={BasketImg}
        >
          <h1 className="cart__title">Cart</h1>

          <div className="cart__content">
            <div className="cart__items">
              {cartProducts.map((cartProduct) => (
                <CartItem cartProduct={cartProduct} key={cartProduct.id} />
              ))}
            </div>
            <div className="cart__checkout">
              <p className="cart__sum">${totalPrice}</p>
              <p className="cart__count">Total for {totalCartAmount} items</p>
              <div className="cart__decor"></div>

              <div
                className="cart__checkoutBtn"
                role="button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <WideBtn mainTitle={'Checkout'} />
              </div>
            </div>
          </div>
        </EmptyComponent>
      </Loader>
    </section>
  );
};
