import React from 'react'
import './OrderModal.css'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioSliceId, listBriefcaseAdd } from '../redux/Slices/portfolioSlice'

export const OrderModal = ({openOrder, setOpenOrder}) => {
    const dispatch = useDispatch();
    const currentCrypto = useSelector(state => state.portfolio.targetCrypto);
    const [orderCrypto, setOrderCrypto] = React.useState('');
    const idStorage = JSON.parse(localStorage.getItem('idStorage'));
    
    const addCrypto = () => {
      const res = parseFloat(orderCrypto)

      if(!isNaN(res)){
        dispatch(listBriefcaseAdd({...currentCrypto, quantity: +res}))
        setOrderCrypto('')
        setOpenOrder(false)
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
        <p className="order-modal__header">Купить <span>{currentCrypto?.name}</span></p>
        <div className="order-modal__submit">
            <p className='order-modal__submit-header'>Введите количество:</p>
            <input className="order-modal__submit-input" type="text" value={orderCrypto} onChange={(e) => setOrderCrypto(e.target.value)} />
            {/* <button onClick={addCrypto} className="order-modal__submit-button">Дабавить</button> */}
        </div>
      </div>
    </Modal>
  )
}
