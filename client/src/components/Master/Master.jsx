import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import './Master.css';

const Master = () => {

  const history = useHistory();

  function onNew () {
    history.push('/new');
  }

  function onHome() {
    history.push('/');
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
      </div>
    </div>
  </div>
};

export default Master;
