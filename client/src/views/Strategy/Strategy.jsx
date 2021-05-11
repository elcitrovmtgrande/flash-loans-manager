import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './Strategy.css';
import uniswapLogo from '../../uniswap-uni-logo.png';
import sushiSwapLogo from '../../sushiswap.png';

const Strategy = ({ app }) => {
  const { strategies, events } = app;
  const { strategyId } = useParams();
  const strategy = strategies.find(strategy => strategy.strategyId === strategyId);
  console.log(strategy)
  const eventsForStrategy = events && events.length > 0
    ? events.filter(event => event.strategyId === strategyId) : null;
  console.log(eventsForStrategy)
  const lastBlock = eventsForStrategy && eventsForStrategy.length > 0
    ? eventsForStrategy[eventsForStrategy.length - 1] : null;

  return (
    <div className="page flex-col-start">
      <div className="infos">
        <div className="infos__lastBlock">
          {lastBlock ? (
            <>
            <h1>Pair details</h1>
            <div style={{display: 'flex', alignItems: 'flex-start'}}>
              <div>
                
                <div className="infos__cryptos">
                  <div className="infos__cryptos--symbol">
                    <img src={strategy.pair.tokenA.icon} alt={strategy.pair.tokenA.symbol} width={30} />
                  </div>
                  <div className="infos__cryptos--symbol tokenB">
                    <img src={strategy.pair.tokenB.icon} alt={strategy.pair.tokenB.symbol} width={30} />
                  </div>
                </div>
                <div>
                  <h3>Profitability</h3>
                  <h1>{new Intl.NumberFormat('en-US').format(lastBlock.absoluteSpread)} %</h1>
                </div>
              </div>
              <div>
                <h3>Uniswap and Sushiswap rates</h3>
                <div className="infos__lastBlock--provider">
                  <img src={uniswapLogo} alt="Uniswap" width={40} />
                  <div className="price">{new Intl.NumberFormat('en-US').format(lastBlock.priceUniswap)}</div>
                </div>
                <div className="infos__lastBlock--provider">
                  <img src={sushiSwapLogo} alt="Uniswap" width={36} />
                  <div className="price">{new Intl.NumberFormat('en-US').format(lastBlock.priceSushiswap)}</div>
                </div>
              </div>
            </div>
            </>
          ) : <div>Waiting for first block...</div>}
        </div>
      </div>
      <div className="graph">
        {JSON.stringify(strategy)}
      </div>
    </div>
  );
};

export default connect(state => state)(Strategy);
