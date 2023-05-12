import React from 'react'
//Antd
import { Modal, Button, message } from 'antd'
// import { Button, message } from 'antd';
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioSliceId, listBriefcaseAdd } from '../redux/Slices/portfolioSlice'
//Css
import './OrderModal.css'

export const OrderModal = ({openOrder, setOpenOrder}) => {
    const dispatch = useDispatch();
    const currentCrypto = useSelector(state => state.portfolio.targetCrypto);
    const [orderCrypto, setOrderCrypto] = React.useState('');
    const idStorage = JSON.parse(localStorage.getItem('idStorage'));
    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
      messageApi.info('Успешно куплено!');
    };

  

    const addCrypto = () => {
      const res = parseFloat(orderCrypto)

      if(!isNaN(res)){
        dispatch(listBriefcaseAdd({...currentCrypto, quantity: +res}))
        setOrderCrypto('')
        setOpenOrder(false)
        info()
      }else{
        alert('Допускаются только цифры')
      }
      setOrderCrypto('')
    }

    const pressEnter =(e) => {
      console.log(e)
      if(e.key === 'Enter'){
        addCrypto()
      }
    }

    React.useEffect(() => {
        dispatch(fetchPortfolioSliceId(idStorage));
      }, [dispatch, idStorage])
      
  return (
    <Modal
      style={{ padding: 20, alignItems: 'center' }}
      title={false}
      centered
      open={openOrder}
      onOk={addCrypto}
      onCancel={() => setOpenOrder(false)}
      width={1000}>
      <div className="order-modal">
      {contextHolder}
        <p className="order-modal__header">Купить <span>{currentCrypto?.name}</span></p>
        <div className="order-modal__submit">
            <p className='order-modal__submit-header'>Введите количество:</p>
            <input onKeyDown={pressEnter} className="order-modal__submit-input" type="text" value={orderCrypto} onChange={(e) => setOrderCrypto(e.target.value)} />
        </div>
      </div>
    </Modal>
  )
}
