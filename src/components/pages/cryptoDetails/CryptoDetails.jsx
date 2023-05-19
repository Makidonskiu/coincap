import React from 'react'
import { Link } from 'react-router-dom';
//Antd
import { message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioSliceId, listBriefcaseAdd } from '../../redux/Slices/portfolioSlice'
//Components
import { LineChart } from '../../lineChart/LineChart';
//JS
import { formatNumber } from '../../../formatNumber/formatNumber';
//Css
import "./CryptoDetails.css";

export const CryptoDetails = () => {
  const dispatch = useDispatch()
  const currentCrypto = useSelector(state => state.portfolio.targetCrypto)
  const listBriefcase = useSelector(state => state.portfolio.listBriefcase)
  const [cryptoOrder, setCryptoOrder] = React.useState('');
  
  const idStorage = JSON.parse(localStorage.getItem('idStorage'));

  const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
      messageApi.info('Успешно куплено!');
    };

  const clickByCrypto = () => {
    const res = parseFloat(cryptoOrder)
    
    if(!isNaN(res)){
      dispatch(listBriefcaseAdd({...currentCrypto, quantity: +res}))
      setCryptoOrder('')
      info()
    }else{
      alert('Допускаются только цифры')
      setCryptoOrder('')
    }
  }
  
  const pressEnter = (e) => {
    if(e.key === 'Enter'){
      clickByCrypto()
    }
  }

React.useEffect(() => {
  dispatch(fetchPortfolioSliceId(idStorage))
  }, [dispatch, idStorage, listBriefcase])


  return (
    <div className='crypto-details'>
      {contextHolder}
      <h1 className='crypto-details__header'><span>{currentCrypto?.symbol}</span>{currentCrypto?.name}</h1>
      <div className='crypto-details__order'>
          <h2 className='crypto-details__sub-header'>Введите количество:</h2>
          <div className="crypto-details__submit">
            <input autoFocus onKeyDown={pressEnter} type="text" value={cryptoOrder} onChange={(e) => setCryptoOrder(e.target.value)}/>
            <button onClick={clickByCrypto}>Купить</button>
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
              <td>{(+currentCrypto?.priceUsd).toFixed(2)}$</td>
            </tr>
            <tr>
              <td>Доступное предложение для торговли</td>
              <td>{formatNumber(+currentCrypto?.supply)}</td>
            </tr>
            <tr>
              <td>Общее кол-во выпущенных активов</td>
              <td>{formatNumber(+currentCrypto?.marketCapUsd)}</td>
            </tr>
            <tr>
              <td>Объем торгов за последние 24 часа</td>
              <td>{formatNumber(+currentCrypto?.volumeUsd24Hr)}</td>
            </tr>
            <tr>
              <td>Средняя цена по объему за последние 24 часа</td>
              <td>{formatNumber(+currentCrypto?.vwap24Hr)}</td>
            </tr>
            <tr>
              <td>Процентное измерения цены за последние 24 часа</td>
              <td>{(+currentCrypto?.changePercent24Hr).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Сайт</td>
              <td><a href={currentCrypto?.explorer}>{currentCrypto?.explorer}</a></td>
            </tr>
          </tbody>
        </table>
        <div style={{height: 400, maxWidth: 800, margin: "auto"}} className="crypto-details__graf">
        <LineChart/>
        </div>
        <div className='crupto-details__back'><Link className='crupto-details__link' to={'/coincap/'}><button>
        <ArrowLeftOutlined className='crupto-details__arrow-left-outlined' />Назад</button></Link></div>
      </div>
    </div>
  )
}
