import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './NewPair.css';
import { Button, Select } from '../../components';
import { connect } from 'react-redux';

const NewPairPage = ({ app, dispatch }) => {
  const [options, setOptions] = useState([]);
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetchPairs();
  }, []);

  async function fetchPairs() {
    const optionsReq = await fetch('http://localhost:5000/api/cryptos');
    const cryptos = await optionsReq.json();
    setOptions(cryptos);
  }

  async function postStrategy() {
    const pair = [];
    if (!tokenA || !tokenB) {
      alert('Please fill the form correctly, mofo.');
      return;
    }
    pair[0] = tokenA.symbol;
    pair[1] = tokenB.symbol;

    const postRequest = await fetch('http://localhost:5000/api/strategy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pair }),
    });

    const response = await postRequest.json();

    console.log(response);

    const strategyObject = {
      strategyId: response.strategyId,
      pair: {
        tokenA,
        tokenB,
      },
    };

    const action = {
      type: 'UPDATE_STRATEGIES',
      value: strategyObject,
    };
    console.log(dispatch)
    dispatch(action);

    history.push(`/strategy/${response.strategyId}`);
    
  }

  return (
    <div className="page flex-col">
      <div className="form flex-col">
        <h1>Create a new pair</h1>
        <h3>Please fill this short form to watch a new pair</h3>
        <Select
          options={options}
          placeholder="Please select Token A"
          onChange={(option) => setTokenA(option)} />
        <Select
          options={options}
          placeholder="Please select Token B"
          onChange={(option) => setTokenB(option)} />
        {/* <Select /> */}
        <Button label="Add" width={200} onClick={postStrategy} />
      </div>
    </div>
  );
};

export default connect(state => state)(NewPairPage);
