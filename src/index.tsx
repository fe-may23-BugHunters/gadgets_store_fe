import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import { Auth0Provider } from '@auth0/auth0-react';

import { AppRouter } from './utils/router';
import { FavoriteProvider } from './context/FavouriteContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID as string}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <CartProvider>
        <FavoriteProvider>
          <AppRouter />
        </FavoriteProvider>
      </CartProvider>
    </React.StrictMode>
  </Auth0Provider>,
);
