import React, { Component } from 'react';
// import {Router, Route, Link} from 'react-router';
import {Router,Route,Link} from 'react-router';
import { hashHistory } from "react-router"
import 'antd/dist/antd.css';
import './common.scss';
import Personal from './containers/personal/index';
import IndexPage from './containers/indexPage';
import ArticleDetail from './containers/articleDetail';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route exact path="/" component={IndexPage}></Route>
        <Route path="/article" component={ArticleDetail}/>
        <Route path="/personal" component={Personal}></Route>
      </Router>
    );
  }
}

export default App;
