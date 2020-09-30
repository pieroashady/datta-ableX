import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';
import Parse from 'parse';

// Parse.initialize(
//   process.env.REACT_APP_APPLICATION_ID,
//   process.env.REACT_APP_JAVASCRIPT_KEY,
//   process.env.REACT_APP_MASTER_KEY
// );
// Parse.serverURL = process.env.REACT_APP_SERVER_URL;
// Parse.masterKey = process.env.REACT_APP_MASTER_KEY;

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      {/* basename="/datta-able" */}
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
