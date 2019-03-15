import React, { Component } from 'react';
// import {Router, Route, Link} from 'react-router';
import {Router,Route,Link} from 'react-router';
import { hashHistory } from "react-router"
import 'antd/dist/antd.css';
import './common.scss';
import Personal from './containers/personal/index';
import IndexPage from './containers/indexPage';
import Article from './components/article';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/personal" component={Personal}></Route>
        <Route exact path="/" component={IndexPage}>
          <Route path="/article" component={Article}/>
        </Route>
      </Router>
    );
  }
}

export default App;
