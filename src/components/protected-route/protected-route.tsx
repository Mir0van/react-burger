import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../loader/loader';
import styles from './protected-route.module.css'

type TProtectedRouteProps = {
  onlyUnAuth: boolean;
  component: React.ReactElement;
};

function ProtectedRoute({ onlyUnAuth, component }: TProtectedRouteProps): React.JSX.Element {
  // @ts-ignore
  const { isAuthChecked, user } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace={true}/>;
  }

  return component;
}

export const OnlyAuth = ({ component }: { component: React.ReactElement }) => <ProtectedRoute onlyUnAuth={false} component={component} />;
export const OnlyUnAuth = ({ component }: { component: React.ReactElement }) => <ProtectedRoute onlyUnAuth={true} component={component} />;
