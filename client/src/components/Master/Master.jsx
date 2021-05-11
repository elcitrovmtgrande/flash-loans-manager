import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import TouchableStrategy from '../TouchableStrategy/TouchableStrategy';
import { connect } from 'react-redux';
import './Master.css';

const Master = ({ app, dispatch }) => {
  const { strategies } = app;

  const history = useHistory();

  function onNew() {
    history.push('/new');
  }

  function onHome() {
    history.push('/');
  }

  async function startAll() {
    const optionsReq = await fetch('http://localhost:5000/api/cryptos');
    const cryptos = await optionsReq.json();

    for (let i = 0; i < cryptos.length; i++) {
      console.log(cryptos)
      const crypto = cryptos[i];
      console.log('crypto', crypto);
      const { symbol } = crypto;
      if (symbol !== 'WETH') {
        const pair = ['WETH', symbol];
        const postRequest = await fetch('http://localhost:5000/api/strategy', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pair }),
        });
        const response = await postRequest.json();
        const strategyObject = {
          strategyId: response.strategyId,
          pair: {
            tokenA: cryptos.find(c => c.symbol === 'WETH'),
            tokenB: crypto,
          },
        };
    
        const action = {
          type: 'UPDATE_STRATEGIES',
          value: strategyObject,
        };
        dispatch(action);
      }
    }
    // if (!tokenA || !tokenB) {
    //   alert('Please fill the form correctly, mofo.');
    //   return;
    // }
    // pair[0] = tokenA.symbol;
    // pair[1] = tokenB.symbol;

    // const postRequest = await fetch('http://localhost:5000/api/strategy', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ pair }),
    // });

    // const response = await postRequest.json();

    // console.log(response);

    // const strategyObject = {
    //   strategyId: response.strategyId,
    //   pair: {
    //     // tokenA,
    //     // tokenB,
    //   },
    // };

    // const action = {
    //   type: 'UPDATE_STRATEGIES',
    //   value: strategyObject,
    // };
    // // console.log(dispatch)
    // // dispatch(action);

    // history.push(`/strategy/${response.strategyId}`);

  }

  return <div className="master">
    <div className="master__header">
      <div className="page">
        <h1 onClick={onHome}>Flash <span className="emphasized-text">Manhattan</span></h1>
        <h3>
          Monitor, watch, analyze and run flash loans
          over the ETH ecosystem.
        </h3>
        <Button label="Create pair" onClick={onNew} />
        <div style={{ marginTop: 20 }}>
          <Button label="Launch all" bgColor="black" onClick={startAll} />
        </div>


        {strategies && strategies.length > 0 && (
          <div className="strategies">
            {strategies.map(strategy => {
              return (
                <TouchableStrategy key={strategy.strategyId} strategy={strategy} />
              )
            })}
          </div>
        )}
      </div>
    </div>
  </div>
};

export default connect(state => state)(Master);
