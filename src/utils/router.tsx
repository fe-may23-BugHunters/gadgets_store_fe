import React from 'react';
import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import { CartPage } from '../pages/CartPage';
import App from '../App';
import { HomePage } from '../pages/HomePage/HomePage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { PhonesPage } from '../pages/PhonesPage';
import { TabletsPage } from '../pages/TabletsPage';
import { NotFound } from '../pages/NotFound';
import { FavouritesPage } from '../pages/FavouritesPage';
import { ProductItem } from '../pages/ProductItem';
import { RightsPage } from '../pages/RightsPage';
import { ContactsPage } from '../pages/ContactsPage';
import { AuthMiddleWare } from '../middlewares/AuthMiddleware';
import { ProfilePage } from '../pages/ProfilePage';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":itemId" element={<ProductItem />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":itemId" element={<ProductItem />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":itemId" element={<ProductItem />} />
          </Route>

          <Route path="profile" element={(
            <AuthMiddleWare>
              <ProfilePage />
            </AuthMiddleWare>
            )}
          />

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="rights" element={<RightsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
