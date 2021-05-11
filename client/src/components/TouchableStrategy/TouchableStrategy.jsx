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
      {pair.tokenA.symbol} / {pair.tokenB.symbol}
    </div>
  );
};

export default TouchableStrategy;
