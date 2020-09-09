import Amplify from 'aws-amplify';
import config from './aws-exports';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import AppWrapper from './AppWrapper';
import * as serviceWorker from './serviceWorker';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'prismjs/themes/prism-coy.css';

Amplify.configure(config);

ReactDOM.render(
  <Router>
    <AppWrapper />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();