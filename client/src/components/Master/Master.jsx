import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import TouchableStrategy from '../TouchableStrategy/TouchableStrategy';
import { connect } from 'react-redux';
import './Master.css';

const Master = ({ app }) => {
  const { strategies } = app;

  const history = useHistory();

  function onNew() {
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

        {strategies && strategies.length > 0 && (
          <div className="strategies">
            {strategies.map(strategy => {
              return (
                <TouchableStrategy strategy={strategy} />
              )
            })}
          </div>
        )}
      </div>
    </div>
  </div>
};

export default connect(state => state)(Master);
