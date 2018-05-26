import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AppHeader from './components/ui.header/ui.header';
import AppBody from './components/ui.body/ui.body';
import AppFooter from './components/ui.footer/ui.footer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppHeader />, document.getElementById('AppHeader'));

ReactDOM.render(<AppBody />, document.getElementById('AppBody'));

ReactDOM.render(<AppFooter />, document.getElementById('AppFooter'));

registerServiceWorker();
