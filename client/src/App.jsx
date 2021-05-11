import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import {Provider} from 'react-redux';
import Store from './store';
import './App.css';
import { Master } from './components';
import { NoData, NewPair } from './views';

function App() {
  return (
    <Router>
      <Provider store={Store}>
        <div className="App">
          <Master />
          <div className="route">
            <Switch>
              <Route path="/new">
                <NewPair />
              </Route>
              <Route path="/">
                <NoData />
              </Route>
            </Switch>
          </div>
        </div>
      </Provider>

    </Router>

  );
}

export default App;
