import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { usePathname } from '../../hooks/usePathname';
import { useAuth0 } from '@auth0/auth0-react';
import { WideBtn } from '../../components/WideBtn';
import { OrderItem } from '../../components/OrderItem';
import { Loader } from '../../components/Loader';
import { EmptyComponent } from '../../components/EmptyComponent';
import EmptyImg from '../../assets/icons/emptyList.png';
import { getOrdersByUserId } from '../../api/orders';
import { Order } from '../../types/order';

export const ProfilePage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname, onPathChange } = usePathname();
  const { user, logout } = useAuth0();

  useEffect(() => {
    setIsLoading(true);

    getOrdersByUserId(user.sub)
      .then(ordersFromServer => {
        setOrders(ordersFromServer);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="profile">
      <div className="profile__breadCrumbs">
        <BreadCrumbs pathname={pathname} onPathChange={onPathChange} />
      </div>

      <div className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Hello, {user?.name}</h2>

          <p className="profile__email">{user?.email}</p>
        </div>

        <button
          className="profile__logoutBtn"
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          <WideBtn mainTitle="Log out" />
        </button>
      </div>

      <Loader isLoading={isLoading}>
        <EmptyComponent
          data={orders}
          title={'There are no orders yet...'}
          icon={EmptyImg}
        >
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
