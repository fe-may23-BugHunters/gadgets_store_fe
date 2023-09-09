import React, { createContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { CartItemAction, Product, ProductWithCount } from '../types/product';

interface Context {
  cartProducts: ProductWithCount[];
  totalPrice?: number;
  totalAmount?: number;
  addCartProduct: (product: Product) => void;
  removeCartProduct: (id: string) => void;
  clearCart: () => void;
  changeCount: (id: string, action: CartItemAction) => void;
}

export const CartContext = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<ProductWithCount[]>(
    'cartProducts',
    [],
  );

  const addCartProduct = (cartProduct: Product) => {
    const isProductExist = cartProducts.find(
      (product) => product.id === cartProduct.id,
    );

    if (isProductExist) {
      return;
    }

    setCartProducts((current) => [
      ...current,
      {
        ...cartProduct,
        count: 1,
      },
    ]);
  };

  const removeCartProduct = (id: string) => {
    setCartProducts((current) =>
      current.filter((cartProductId) => cartProductId.id !== id));
  };

  const changeCount = (id: string, action: CartItemAction) => {
    setCartProducts((current) =>
      current.map((product) => {
        if (product.id === id) {
          const changedCount
            = action === CartItemAction.ADD
              ? product.count + 1
              : product.count - 1;

          return {
            ...product,
            count: changedCount,
          };
        }

        return product;
      }));
  };

  const clearCart = () => {
    setCartProducts(() => []);
  };

  const totalPrice = React.useMemo(() => {
    if (cartProducts.length === 0) {
      return;
    }

    return cartProducts
      .map((product) => {
        const price = product.priceDiscount || product.priceRegular || 0;

        return price * product.count;
      })
      .reduce((a, b) => a + b);
  }, [cartProducts]);

  const totalAmount = React.useMemo(() => {
    if (cartProducts.length === 0) {
      return;
    }

    return cartProducts.map((product) => product.count).reduce((a, b) => a + b);
  }, [cartProducts]);

  const value = {
    cartProducts,
    totalPrice,
    totalAmount,
    addCartProduct,
    removeCartProduct,
    changeCount,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
