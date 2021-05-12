import React from 'react';
import { useHistory } from 'react-router-dom';
import './TouchableStrategy.css';

const TouchableStrategy = ({ strategy }) => {
  const { pair, strategyId } = strategy;
  const history = useHistory();

  function onPair() {
    history.push(`/strategy/${strategyId}`);
  }

  return (
    <div className="touchableStrategy" onClick={onPair}>
      <div className="cryptos">
        <div className="cryptos__symbol">
          <img src={strategy.pair.tokenA.icon} alt={strategy.pair.tokenA.symbol} width={40} />
        </div>
        <div className="infos__cryptos--symbol tokenB">
          <img src={strategy.pair.tokenB.icon} alt={strategy.pair.tokenB.symbol} width={40} />
        </div>
      </div>
        <span className="token__symbol">{pair.tokenA.symbol} / {pair.tokenB.symbol}</span> 
        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.875 9.79167V37.2083C5.875 39.3684 7.63162 41.125 9.79167 41.125H37.2083C39.3684 41.125 41.125 39.3684 41.125 37.2083V9.79167C41.125 7.63162 39.3684 5.875 37.2083 5.875H9.79167C7.63162 5.875 5.875 7.63162 5.875 9.79167ZM18.1988 15.0929L20.9679 12.3238L32.1441 23.5L20.9679 34.6762L18.1988 31.9071L26.6059 23.5L18.1988 15.0929Z" fill="black"/>
        </svg>
    </div>
  );
};

export default TouchableStrategy;
