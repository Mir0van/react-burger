import React, { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/layout';
import Home from '../../pages/home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
