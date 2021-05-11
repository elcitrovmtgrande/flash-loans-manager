import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './Strategy.css';

const Strategy = ({ app }) => {
  const {strategies} = app;
  const { strategyId } = useParams();
  const strategy = strategies.find(strategy => strategy.strategyId === strategyId);
  return (
    <div className="page flex-col">
      <div className="graph">
        {JSON.stringify(strategy)}
      </div>
      <div className="infos">

      </div>
    </div>
  );
};

export default connect(state => state)(Strategy);
