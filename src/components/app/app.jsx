import React, { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import Home from '../../pages/home/home';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  // console.log(location, 'location app')

  useEffect(() => {
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
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
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
