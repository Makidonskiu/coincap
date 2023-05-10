import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioSliceId } from '../redux/Slices/portfolioSlice'

import { ArrowLeftOutlined } from '@ant-design/icons';

import "./CryptoDetails.css";
import { Link } from 'react-router-dom';

export const CryptoDetails = () => {
  const dispatch = useDispatch()
  const currentCrypto = useSelector(state => state.portfolio.list)
  const [cryptoOrder, setCryptoOrder] = React.useState('');
  const idStorage = JSON.parse(localStorage.getItem('idStorage'));
 
  
  React.useEffect(() => {
    dispatch(fetchPortfolioSliceId(idStorage))
  }, [dispatch, idStorage])


  return (
    <div className='crypto-details'>
      <h1 className='crypto-details__header'><span>{currentCrypto?.symbol}</span>{currentCrypto?.name}</h1>
      <div className='crypto-details__order'>
          <h2 className='crypto-details__sub-header'>Введите количество:</h2>
          <div className="crypto-details__submit">
            <input type="text" value={cryptoOrder} onChange={(e) => setCryptoOrder(e.target.value)}/>
            <button onClick={()=>{}}>Купить</button>
          </div>
      </div>
      <div className="crupto-details__information">
        <table  className="crupto-details__table">
          <thead>
            <tr>
              <th>Информация</th>
              <th>Данные о валюте</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Цена</td>
              <td>{(+currentCrypto.priceUsd).toFixed(2)}$</td>
            </tr>
            <tr>
              <td>Доступное предложение для торговли</td>
              <td>1111111</td>
            </tr>
            <tr>
              <td>Общее кол-во выпущенных активов</td>
              <td>1111111</td>
            </tr>
            <tr>
              <td>Объем торгов за последние 24 часа</td>
              <td>1111111</td>
            </tr>
            <tr>
              <td>Средняя цена по объему за последние 24 часа</td>
              <td>{(+currentCrypto.vwap24Hr).toFixed(2)}$</td>
            </tr>
            <tr>
              <td>Процентное измерения цены за последние 24 часа</td>
              <td>{(+currentCrypto.changePercent24Hr).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Сайт</td>
              <td><a href={currentCrypto.explorer}>{currentCrypto.explorer}</a></td>
            </tr>
          </tbody>
        </table>
        <div className='crupto-details__back'><Link className='crupto-details__link' to={'/'}><button>
        <ArrowLeftOutlined className='crupto-details__arrow-left-outlined' />Назад</button></Link></div>
      </div>
    </div>
  )
}
