import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import './App.css';
import { Master } from './components';
import { NoData, NewPair } from './views';

function App() {
  return (
    <Router>
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
    </Router>

  );
}

export default App;
