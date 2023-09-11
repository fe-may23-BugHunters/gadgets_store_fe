import React, { createContext } from 'react';
import { getAllByUserId } from '../api/favourites';
import { Product } from '../types/product';

interface Context {
  favouriteProducts: Product[];
  isLoading: boolean;
  addFavouriteProduct: (product: Product) => void;
  removeFavouriteProduct: (id: string) => void;
  totalFavouritesAmount: number;
}

export const FavouriteContext = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProducts, setFavouriteProducts] = React.useState<Product[]>(
    [],
  );

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAllByUserId()
      .then((dataFromServer) => {
        setFavouriteProducts(() =>
          dataFromServer.data.map(
            ({ product }: { product: Product }) => product,
          ));
      })
      .catch(() => {
        throw new Error('Product by id is not found');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addFavouriteProduct = (newFavourite: Product) => {
    const isProductExist = favouriteProducts.find(
      (product) => product.id === newFavourite.id,
    );

    if (isProductExist) {
      return;
    }

    setFavouriteProducts((products) => [...products, newFavourite]);
  };

  const removeFavouriteProduct = (id: string) => {
    setFavouriteProducts((current) =>
      current.filter((product) => product.id !== id));
  };

  const totalFavouritesAmount = React.useMemo(() => {
    return favouriteProducts.length;
  }, [favouriteProducts]);

  const value = {
    favouriteProducts,
    isLoading,
    addFavouriteProduct,
    removeFavouriteProduct,
    totalFavouritesAmount,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
