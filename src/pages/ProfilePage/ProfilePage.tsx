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
  const [orders] = React.useState<Order[]>([]);
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
                  logoutParams: {
                    returnTo:
                      process.env.NODE_ENV === 'development'
                        ? window.location.origin
                        : window.location.origin + '/gadgets_store_fe',
                  },
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
