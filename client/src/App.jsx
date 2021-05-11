import './App.css';
import { Master } from './components';
import NoDataSvg from './undraw_crypto_portfolio_2jy5.svg'

function App() {
  return (
    <div className="App">
     <Master />
     <div className="route">
        <div className="page flex-col">
          <h1>You ain't got <span class="emphasized-text">no pair</span></h1>
          <h3>Add a pair to watch or tell your bitch to do it for you tho.</h3>
          <img className="noDataSvg" src={NoDataSvg} alt="You have no pair watching. Create a pair to start." width="500"/>
        </div>
     </div>
    </div>
  );
}

export default App;
