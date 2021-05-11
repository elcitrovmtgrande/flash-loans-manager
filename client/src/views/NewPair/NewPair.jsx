import React, { useEffect, useState } from 'react';
import './NewPair.css';
import { Button, Select } from '../../components';

const NewPairPage = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchPairs();
  }, []);

  async function fetchPairs() {
    const optionsReq = await fetch('http://localhost:5000/api/cryptos');
    const cryptos = await optionsReq.json();
    setOptions(cryptos);
  }

  return (
    <div className="page flex-col">
      <div className="form flex-col">
        <h1>Create a new pair</h1>
        <h3>Please fill this short form to watch a new pair</h3>
        <Select options={options} placeholder="Please select Token A"/>
        <Select options={options} placeholder="Please select Token B"/>
        {/* <Select /> */}
        <Button label="Add" width={200}/>
      </div>
    </div>
  );  
};

export default NewPairPage;
