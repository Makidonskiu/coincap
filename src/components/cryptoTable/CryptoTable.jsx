import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CryptoTable.css';
import { formatNumber } from '../../formatNumber/formatNumber';
import { usePagination } from '../paginationHoc/usePagination';
import plus from '../../image/plus.svg';

import { Table } from 'antd';
import { currentId } from '../redux/Slices/portfolioSlice';
import { useNavigate } from 'react-router-dom';


export const CryptoTable = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.cryptocurrencies.list);


  const currentIdStorage = (i) => localStorage.setItem('idStorage', JSON.stringify(i))

  const { currentPage, totalPages, currentItems, goToNextPage, goToPreviousPage, goToPage } =
  usePagination(currencies, 10);
  
  

  const handleClickAdd = (id) => {
    dispatch(currentId(id))
  }
  
  const handleClickCurrenciesInformation = (i) => {
    currentIdStorage(i)
    // dispatch(currentId(i))
    navigate(`/crypto`)    
  }

  const columns = [
    {
      title: '№',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: ' ',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (text, {id}) => <p onClick={() => handleClickCurrenciesInformation(id)} style={{ color: '#EC0C91', cursor: 'pointer' }}>{text}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'VWAP(24Hr)',
      dataIndex: 'vwap24Hr',
      key: 'vwap24Hr',
      render: (text) => <p className="">{Number(text).toFixed(2)}$</p>,
    },
    {
      title: 'Change(24Hr)',
      dataIndex: 'changePercent24Hr',
      key: 'changePercent24Hr',
      render: (text) => (
        <p style={{ color: text < 0 ? 'red' : 'green' }}>{Number(text).toFixed(2)}$</p>
      ),
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCapUsd',
      key: 'marketCapUsd',
      render: (text) => <p>{formatNumber(text)}</p>,
    },
    {
      title: 'Price',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      render: (text) => <p className="">{Number(text).toFixed(2)}$</p>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'id',
      render: ({id}) => <img onClick={()=>handleClickAdd(id)} className="crypto-table__plus" src={plus} alt="add" />,
    },
  ];
  

  const handleClickPagination = (id) => {
    goToPage(id + 1);
    setActive(id);
  };

  // React.useEffect(()=>{

  // }, [dispatch, ])

  const keyCurrentItems = currentItems.map(item => ({...item, key: item.id}))
  return (
    <div className="crypto-table">
      <div className="crypto-table__table">
        {currentItems.length > 0 && (
          <Table dataSource={keyCurrentItems} columns={columns} pagination={false} />
        )}
      </div>
      <div className="crypto-table__pagination">
        <button
          className={
            currentPage === 1
              ? 'crypto-table__pagination-button disable'
              : 'crypto-table__pagination-button'
          }
          onClick={() => goToPreviousPage(setActive)}
          disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={
              active === index
                ? 'crypto-table__pagination-button active'
                : 'crypto-table__pagination-button'
            }
            key={index}
            onClick={() => handleClickPagination(index)}>
            {index + 1}
          </button>
        ))}
        <button
          className={
            currentPage === totalPages
              ? 'crypto-table__pagination-button disable'
              : 'crypto-table__pagination-button'
          }
          onClick={() => goToNextPage(setActive)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
