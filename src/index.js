require('./index.scss');

import {createStore, applyMiddleware} from 'redux'
import App from './js/components/app'
import React from 'react'
import ReactDOM from  'react-dom'
import posts from './js/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

//store
const store = createStore(
    posts,
    applyMiddleware(thunk)
);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);