import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import {Provider} from 'react-redux';
import socketIOClient from 'socket.io-client';
import Store from './store';
import './App.css';
import { Master } from './components';
import { NoData, NewPair, Strategy } from './views';

function App() {
  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000');
    socket.on('block', (data) => {
      const action = {
        type: 'UPDATE_EVENTS',
        value: data,
      };
      Store.dispatch(action);
    });
  }, []);
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
              <Route path="/strategy/:strategyId">
                <Strategy />
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
