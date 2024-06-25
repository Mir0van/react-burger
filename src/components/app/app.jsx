import React, { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { getUser } from '../../services/user/actions';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import Home from '../../pages/home/home';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import Login from '../../pages/login/login';
import NotFoundPage from '../../pages/404/404';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Feed from '../../pages/feed/feed';
import Profile from '../../pages/profile/profile';
import ProfileInputs from '../profile-inputs/profile-inputs';
import FeedHistory from '../feed-history/feed-history';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  // console.log(location, 'location app')

  useEffect(() => {
    dispatch(getUser())
    dispatch(getIngredients())
  }, [dispatch])

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />}/>} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>}/>} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/profile' element={<OnlyAuth component={<Profile/>}/>}>
            <Route index element={<ProfileInputs />} />
            <Route path='orders' element={<FeedHistory />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* роуты для модалок */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onClose={handleModalClose} header={'Детали ингредиента'}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
