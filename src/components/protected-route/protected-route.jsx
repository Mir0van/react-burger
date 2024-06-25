import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../loader/loader';
import styles from './protected-route.module.css'

function ProtectedRoute({ onlyUnAuth, component }) {
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

ProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool.isRequired,
  component: PropTypes.node.isRequired,
};

export const OnlyAuth = ({ component }) => <ProtectedRoute onlyUnAuth={false} component={component} />;;
export const OnlyUnAuth = ({ component }) => <ProtectedRoute onlyUnAuth={true} component={component} />;
