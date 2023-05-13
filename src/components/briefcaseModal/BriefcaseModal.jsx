import React from 'react';
//Antd
import { Modal, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteListBriefcaseTarget, onCancelDelete } from '../redux/Slices/portfolioSlice';
//Css
import './BriefcaseModal.css';

export const BriefcaseModal = ({ openBriefcase, setOpenBriefcase }) => {
  const dispatch = useDispatch()
  const listBriefcase = useSelector((state) => state.portfolio.listBriefcase);
  const priceSum = listBriefcase.reduce((acc, item) => acc + +item.priceUsd * +item.quantity, 0);

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

  const handleClickOk = () => {
    setOpenBriefcase(false)
  }
  const handleClickCancel = () => {
    dispatch(onCancelDelete())
    setOpenBriefcase(false)
  }

  return (
    <Modal
      style={{ padding: 20, alignItems: 'center' }}
      title={false}
      centered
      open={openBriefcase}
      onOk={handleClickOk}
      onCancel={handleClickCancel}
      closable={false}
      width={1000}>
      <div className="briefcase-modal">
        {listBriefcase.length > 0 ? (
          <div className="briefcase-modal__table">
            <h2 className="briefcase-modal__header">Портфель</h2>
            <Table
              style={{ height: '100%', marginBottom: 30 }}
              dataSource={listBriefcase}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
            <div className="briefcase-modal__footer">
              <p>Итого: </p>
              <p className="briefcase-modal__result">{(+priceSum).toFixed(2)} $</p>
            </div>
          </div>
        ) : (
          <h2 style={{marginTop: 240}} className="briefcase-modal__header">Портфель пустой...</h2>
        )}
      </div>
    </Modal>
  );
};
