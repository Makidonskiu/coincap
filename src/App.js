// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Components
import { Header } from './components/header/Header';
import { CryptoTable } from './components/cryptoTable/CryptoTable';
import { CryptoDetails } from './components/cryptoDetails/CryptoDetails';
import { fetchCurrencies } from './components/redux/Slices/cryptocurrenciesSlice';
// Css
import './App.css';
import { Layout } from './components/layout/Layout';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<CryptoTable />} />
          <Route path={'crypto'} element={<CryptoDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
