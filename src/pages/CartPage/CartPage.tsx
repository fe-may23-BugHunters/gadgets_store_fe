import React, { useContext } from 'react';
import './CartPage.scss';
import { CartItem } from '../../components/CartItem';
import { BtnBack } from '../../components/BtnBack';
import { WideBtn } from '../../components/WideBtn';
import { CartModal } from '../../components/CartModal';
import { CartContext } from '../../context/CartContext';
import { Loader } from '../../components/Loader';
import { EmptyComponent } from '../../components/EmptyComponent';

export const CartPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { cartProducts, totalPrice, totalCartAmount, clearCart }
    = useContext(CartContext);

  return (
    <section className="cart">
      {isModalOpen && <CartModal handleClick={() => setIsModalOpen(false)} />}

      <div className="cart__btnBack">
        <BtnBack />
      </div>

      <h1 className="cart__title">Cart</h1>
      <Loader isLoading={false}>
        <EmptyComponent
          data={cartProducts}
          text={"You haven't added anything to your cart yet"}
        >
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
                  clearCart();
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
