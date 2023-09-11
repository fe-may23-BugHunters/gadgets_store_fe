import React from 'react';
import './ProfilePage.scss';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { usePathname } from '../../hooks/usePathname';
import { useAuth0 } from '@auth0/auth0-react';
import { WideBtn } from '../../components/WideBtn';
import { OrderItem } from '../../components/OrderItem';
import { Order } from '../../types/product';
import { Loader } from '../../components/Loader';
import { EmptyComponent } from '../../components/EmptyComponent';
import EmptyImg from '../../assets/icons/emptyList.png';

export const ProfilePage: React.FC = () => {
  const [orders] = React.useState<Order[]>([
    {
      id: 'dfgdfgdfgfdgdfgdfg',
      totalItems: 1111,
      createdAt: new Date().toString(),
      price: 1111,
      products: [
        {
          productId: 'string',
          name: 'Apple iPhone 11 128GB Black',
          category: 'string',
          quantity: 1,
          price: 1111,
        },
        {
          productId: 'string',
          name: 'Apple iPhone 11 128GB Black',
          category: 'string',
          quantity: 1111,
          price: 1111,
        },
      ],
    },
    {
      id: 'string',
      totalItems: 1111,
      createdAt: new Date().toString(),
      price: 1111,
      products: [
        {
          productId: 'string',
          name: 'Apple iPhone 11 128GB Black',
          category: 'string',
          quantity: 48,
          price: 1111,
        },
      ],
    },
  ]);
  const [isLoading] = React.useState(false);
  const { pathname, onPathChange } = usePathname();
  const { user, logout } = useAuth0();

  return (
    <div className="profile">
      <div className="profile__breadCrumbs">
        <BreadCrumbs pathname={pathname} onPathChange={onPathChange} />
      </div>

      <Loader isLoading={isLoading}>
        <EmptyComponent
          data={orders}
          title={'There are no orders yet...'}
          icon={EmptyImg}
        >
          <div className="profile__header">
            <div className="profile__info">
              <h2 className="profile__title">Hello, {user?.name}</h2>

              <p className="profile__email">{user?.email}</p>
            </div>

            <button
              className="profile__logoutBtn"
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
            >
              <WideBtn mainTitle="Log out" />
            </button>
          </div>

          <h1 className="profile__order-title">Your orders</h1>

          <div className="profile__orders">
            {orders?.map((order) => (
              <React.Fragment key={order.id}>
                <OrderItem order={order} />
              </React.Fragment>
            ))}
          </div>
        </EmptyComponent>
      </Loader>
    </div>
  );
};
