import React, { useContext } from 'react';
import './FavouritesPage.scss';
import { CardItem } from '../../components/CardItem';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { usePathname } from '../../hooks/usePathname';
import { Loader } from '../../components/Loader';
import { EmptyComponent } from '../../components/EmptyComponent';
import { FavouriteContext } from '../../context/FavouriteContext';

export const FavouritesPage: React.FC = () => {
  const { pathname, onPathChange } = usePathname();
  const { favouriteProducts, isLoading, totalFavouritesAmount }
    = useContext(FavouriteContext);

  return (
    <article className="favourites">
      <div className="favourites__breadCrumbs">
        <BreadCrumbs pathname={pathname} onPathChange={onPathChange} />
      </div>

      <h1 className="favourites__title">Favourites</h1>

      <p className="favourites__count">{totalFavouritesAmount} items</p>
      <Loader isLoading={isLoading}>
        <EmptyComponent
          data={favouriteProducts}
          text={"You haven't added anything to your favourites yet"}
        >
          <div className="favourites__cards">
            {favouriteProducts.map((product) => (
              <div key={product.id} className="favourites__card">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </EmptyComponent>
      </Loader>
    </article>
  );
};
