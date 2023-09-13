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

const authClientId: string = process.env.REACT_APP_AUTH_CLIENTID || '';
const authDomain: string = process.env.REACT_APP_AUTH_DOMAIN || '';

root.render(
  <Auth0Provider
    domain={authDomain}
    clientId={authClientId}
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
