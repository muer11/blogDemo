import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import './common.scss';
import Personal from './containers/personal/index';
import IndexPage from './containers/indexPage';
import Article from './components/article';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Route path="/personal" component={Personal}></Route>
        <Route path="/" component={IndexPage}></Route>
        <Route path="/article?articleId=" component={Article}></Route>
      </div>
    );
  }
}

export default App;
