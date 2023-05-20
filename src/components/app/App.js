import React from 'react';
import { Routes, Route } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
//Slice
import { fetchCurrencies } from '../redux/slices/cryptocurrenciesSlice';
// Components
import { Layout } from '../layout/Layout';
import { CryptoTable } from '../pages/cryptoTable/CryptoTable';
import { CryptoDetails } from '../pages/cryptoDetails/CryptoDetails';
// Css
import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);
  return (
      <Routes>
        <Route path='/coincap' element={<Layout />}>
          <Route index element={<CryptoTable />} />
          <Route path='crypto/:id' element={<CryptoDetails />} />
        </Route>
      </Routes>
  );
}

export default App;
