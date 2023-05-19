import React from 'react';
import { Routes, Route } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { fetchCurrencies } from './components/redux/Slices/cryptocurrenciesSlice';
// Components
import { Layout } from './components/layout/Layout';
import { CryptoTable } from './components/pages/cryptoTable/CryptoTable';
import { CryptoDetails } from './components/pages/cryptoDetails/CryptoDetails';
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
          <Route path={`crypto`} element={<CryptoDetails />} />
        </Route>
      </Routes>
  );
}

export default App;
