import React from 'react';
import NoDataSvg from '../undraw_crypto_portfolio_2jy5.svg'

const NoDataPage = () => {
  return (
    <div className="page flex-col"> 
      <h1>You ain't got <span className="emphasized-text">no pair</span></h1>
      <h3>Add a pair to watch or tell your bitch to do it for you tho.</h3>
      <img className="noDataSvg" src={NoDataSvg} alt="You have no pair watching. Create a pair to start." width="500"/>
    </div>
  );  
};

export default NoDataPage;
