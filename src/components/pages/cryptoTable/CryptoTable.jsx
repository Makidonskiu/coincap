import React from 'react';
import { useNavigate } from 'react-router-dom';
//Antd
import { Table } from 'antd';
//Redux
import { useSelector } from 'react-redux';
//JS
import { formatNumber } from '../../../formatNumber/formatNumber';
//Components
import { usePagination } from '../../paginationHoc/usePagination';
import { OrderModal } from '../../modals/orderModal/OrderModal';
//Image
import plus from '../../../image/plus.svg';
//Css
import './CryptoTable.css';

export const CryptoTable = () => {
  const navigate = useNavigate();
  const currencies = useSelector((state) => state.cryptocurrencies.list);
  const [openOrder, setOpenOrder] = React.useState(false);
  const currentIdStorage = (i) => localStorage.setItem('idStorage', JSON.stringify(i));
  const { currentPage, totalPages, currentItems, goToNextPage, goToPreviousPage, goToPage } =
    usePagination(currencies, 10);

  const handleClickAdd = (id) => {
    setOpenOrder(true);
    currentIdStorage(id);
  };

  const handleClickCurrenciesInformation = (i) => {
    currentIdStorage(i);
    navigate(`crypto/${i}`);
  };

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
      render: (text, { id }) => (
        <p
          onClick={() => handleClickCurrenciesInformation(id)}
          style={{ color: '#EC0C91', cursor: 'pointer' }}>
          {text}
        </p>
      ),
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
      render: ({ id }) => (
        <img
          onClick={() => handleClickAdd(id)}
          className="crypto-table__plus"
          src={plus}
          alt="add"
        />
      ),
    },
  ];

  const handleClickPagination = (id) => {
    goToPage(id + 1);
  };

  return (
    <div className="crypto-table">
      <div className="crypto-table__table">
        {currentItems.length > 0 && (
          <div>
            <Table rowKey="id" dataSource={currentItems} columns={columns} pagination={false} />
            <OrderModal openOrder={openOrder} setOpenOrder={setOpenOrder} />
          </div>
        )}
      </div>
      <div className="crypto-table__pagination">
        <button
          className={
            currentPage === 1
              ? 'crypto-table__pagination-button disable'
              : 'crypto-table__pagination-button'
          }
          onClick={goToPreviousPage}
          disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={
              currentPage - 1 === index
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
          onClick={goToNextPage}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
