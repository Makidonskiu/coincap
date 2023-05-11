import React from 'react';
import { Modal, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { formatNumber } from '../../formatNumber/formatNumber';
import { useDispatch, useSelector } from 'react-redux';

import './BriefcaseModal.css';
import { deleteListBriefcaseTarget } from '../redux/Slices/portfolioSlice';

export const BriefcaseModal = ({ openBriefcase, setOpenBriefcase }) => {
  const dispatch = useDispatch()
  const listBriefcase = useSelector((state) => state.portfolio.listBriefcase);
  const price = listBriefcase.reduce((acc, item) => acc + +item.priceUsd, 0);
  const quantity = listBriefcase.reduce((acc, item) => acc + +item.quantity, 0);
  const sumCrypto = price * quantity;

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      render: (text) => <p className="">{Number(text).toFixed(2)}$</p>,
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'id',
    },
    {
      title: 'Итого',
      dataIndex: 'priceUsd',
      key: 'id',
      render: (text, { quantity }) => <p className="">{Number(text * quantity).toFixed(2)}$</p>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: ({ id }) => (
        <span onClick={() => dispatch(deleteListBriefcaseTarget(id))} className="plus-out-line">
          <PlusOutlined
            rotate={45}
            style={{ cursor: 'pointer', fontSize: '16px', color: 'rgb(255, 0, 0)' }}
          />
        </span>
      ),
    },
  ];

  return (
    <Modal
      style={{ padding: 20, alignItems: 'center' }}
      title={false}
      centered
      open={openBriefcase}
      onOk={() => setOpenBriefcase(false)}
      onCancel={() => setOpenBriefcase(false)}
      width={1000}>
      <div className="briefcase-modal">
        <h2 className="briefcase-modal__header">Портфель</h2>
        {true ? (
          <div className="briefcase-modal__table">
            <Table
              style={{ height: '100%', marginBottom: 30 }}
              dataSource={listBriefcase}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
            <div className="briefcase-modal__footer">
              <p>Итого: </p>
              <p className="briefcase-modal__result">{(+sumCrypto).toFixed(2)} $</p>
            </div>
          </div>
        ) : (
          'Портфель пустой...'
        )}
      </div>
    </Modal>
  );
};
