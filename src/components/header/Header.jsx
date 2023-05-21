import React from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { copiedList } from '../redux/slices/portfolioSlice';
//Components
import { BriefcaseModal } from '../modals/briefcaseModal/BriefcaseModal';
//image
import briefcase from '../../image/briefcase.svg';
//Css
import './Header.css';

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
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(typeof apiKey);

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
        <img className="header__img-cart" src={briefcase} alt="briefcase" />
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
