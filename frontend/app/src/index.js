import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Home';
import Register from './Register';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/home" component={HomePage}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
