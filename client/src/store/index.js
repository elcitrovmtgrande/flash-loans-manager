import mainReducer from './reducers/Main.reducer';
import {combineReducers} from 'redux';
import {createStore} from 'redux';

export default createStore(
  combineReducers({
    app: mainReducer,
  }),
);
