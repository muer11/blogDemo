import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import './common.scss';
import Login from './containers/login';
import Register from './containers/register';
import Personal from './containers/personal/index';
import IndexPage from './containers/indexPage';
import Article from './components/article';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Route path="/Register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/personal" component={Personal}></Route>
        <Route path="/" component={IndexPage}></Route>
        <Route path="/article?articleId=" component={Article}></Route>
      </div>
    );
  }
}

export default App;
