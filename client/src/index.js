import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
// TODO Provider
//! Provider : is the higher-order component provided by react-redux
//!            that let you bind redux to react
import {Provider} from "react-redux"
// TODO middleware
import { applyMiddleware, createStore } from "redux"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
// TODO reducers/index.js
import Reducer from "./_reducers/index"

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)


ReactDOM.render(
  <React.StrictMode>
    <Provider 
      store = {createStoreWithMiddleware(Reducer, 
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
//! 위처럼 </Provider>로 감싸주는 방식으로, redux와 react를 연결시킨다.
//! </Provider> 내부에 store, reducer 등을 넣어주어야 한다.
//! 이전에 미들웨어도 처리해 주어야 한다.

//! 또한
//! 리덕스 익스텐션을 사용하기위해 window.__...이 두줄의 코드도 포함하여야한다.


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
