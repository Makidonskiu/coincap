import React from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { copiedList } from '../../redux/slices/portfolioSlice';
//Components
import { BriefcaseModal } from '../modals/briefcaseModal';
//Css
import './index.css';


const imagePath = process.env.PUBLIC_URL + '/image/briefcase.svg';

export const Header = () => {
  const dispatch = useDispatch();
  const cryptocurency = useSelector((state) => state.cryptocurrencies.list);
  const listBriefcase = useSelector((state) => state.portfolio.listBriefcase);
  const [openBriefcase, setOpenBriefcase] = React.useState(false);
  const priceSum = listBriefcase.reduce((acc, item) => acc + +item.priceUsd * +item.quantity, 0);


  const handleClickOpenBriefcase = () => {
    dispatch(copiedList());
    setOpenBriefcase(true);
  };

  const threePopularcryptocurency = cryptocurency.filter((item) => item.rank < 4);
  return (
    <div className="header">
      <div className="header__popular-cryptocurency">
        <p className="header__sub-header">Популярные криптовалюты:</p>
        <div className="header__cryptocurency">
          {threePopularcryptocurency.length > 0 &&
            threePopularcryptocurency.map((item) => (
              <div className="header__crypto" key={item.rank}>
                <h3>{item.name}</h3>
                <p>{Number(item.priceUsd).toFixed(2)}</p>
              </div>
            ))}
        </div>
      </div>
      <div onClick={handleClickOpenBriefcase} className="header__cart">
        <img className="header__img-cart" src={imagePath} alt="briefcase" />
        <div className="header__cart-price">
          <p className="header__sub-header-cart-price">Итого:</p>
          <p>{(+priceSum).toFixed(2)}$</p>
        </div>
      </div>
      <BriefcaseModal
        threePopularcryptocurency={threePopularcryptocurency}
        openBriefcase={openBriefcase}
        setOpenBriefcase={setOpenBriefcase}
      />
    </div>
  );
};
