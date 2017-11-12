import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Shtacks from './Shtacks';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <Shtacks / > , document.getElementById('root'));
registerServiceWorker();