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

function App() {
  const dispatch = useDispatch();
  

  React.useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<CryptoTable />} />
        <Route path={`/crypto`} element={<CryptoDetails />} />
      </Routes>
    </>
  );
}

export default App;
