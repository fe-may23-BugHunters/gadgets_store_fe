import React from 'react';
import ReactDOM from 'react-dom/client';

import { Auth0Provider } from '@auth0/auth0-react';
import { AppRouter } from './utils/router';
import { FavoriteProvider } from './context/FavouriteContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// eslint-disable-next-line max-len, no-console
console.log(`You are running this application in <b>
${process.env.REACT_APP_AUTH_DOMAIN}------
${process.env.REACT_APP_AUTH_CLIENTID}----
${process.env.NODE_ENV}---
${process.env.REACT_APP_AUTH0_PRODUCTION_REDIRECT}---
${window.location.origin}-
</b> mode.`);

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN as string}
    clientId={process.env.REACT_APP_AUTH_CLIENTID as string}
    authorizationParams={{
      redirect_uri:
        process.env.NODE_ENV === 'development'
          ? window.location.origin
          : window.location.origin + '/gadgets_store_fe',
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
