import ReactDOM from 'react-dom/client'
import React from 'react'
import Pages from './Pages';
import { store } from './store'
import { Provider } from 'react-redux'
import NotificationManager from './Components/NotificationManager';
const { VIRFICE_APP_PREFIX } = require("../conf");

const root = ReactDOM.createRoot(document.getElementById(VIRFICE_APP_PREFIX + '-dashboard'));
root.render(
    <Provider store={store}>
        <NotificationManager />
        <Pages />
    </Provider>
);