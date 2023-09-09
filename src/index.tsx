import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './utils/router';
import { FavoriteProvider } from './context/FavouriteContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <CartProvider>
      <FavoriteProvider>
        <AppRouter />
      </FavoriteProvider>
    </CartProvider>
  </React.StrictMode>,
);
