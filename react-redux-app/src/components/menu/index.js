import React from 'react';
import { Avatar } from 'antd';
import { Menu, Icon, Button } from 'antd';
import EditableTagGroup from '../tag/index';
import ManageList from '../contentList/manageList';
// import EditableTagGroup from '../tag/index';
// import EditableTagGroup from '../tag/index';
import './menu.scss';

// const SubMenu = Menu.SubMenu;
const SubMenu = Menu.SubMenu;
class AdminMenu extends React.Component {
  constructor(){
    super();
    this.state = {
      itemName: ''
    }
  }

  callback = (item) => {
    // console.log(item);
    let itemName = '';
    switch (item.key) {
      case 'addArticle':
        itemName = 'addArticle';
        break;
      case 'publishedArticle':
        itemName = 'article';
        break;
      case 'unpublishArticle':
        itemName = 'unpublishArticle';
        break;
      case 'tag':
        itemName = 'tag';
        break;
      case 'comment':
        itemName = 'comment';
        break;
      case 'user':
        itemName = 'user';
        break;
      default: 
        break;
    }
    this.setState({
      itemName: itemName
    });
    setTimeout(function(){
      var { itemName } = this.state;
      this.props.onClick({
        itemName
      });
    }.bind(this), 0);
  }

  render() {
    return (
      <div style={{ width: 256 }} className='menu'>
        <Menu
          defaultSelectedKeys={['publishedArticle']}
          defaultOpenKeys={['article']}
          mode="inline"
          onSelect={this.callback.bind(this)}
        >
          <Menu.Item key="index">
            <a href='/article'>首页</a>
          </Menu.Item>
          <SubMenu key="article" title={<span>文章管理</span>}>
            <Menu.Item key="publishedArticle">已发表</Menu.Item>
            <Menu.Item key="unpublishArticle">草稿箱</Menu.Item>
            <Menu.Item key="addArticle">写文章</Menu.Item>
          </SubMenu>
          <Menu.Item key="tag">
            <span>标签管理</span>
          </Menu.Item>
          <Menu.Item key="comment">
            <span>评论管理</span>
          </Menu.Item>
          <Menu.Item key="user">
            <span>用户管理</span>
          </Menu.Item>
        </Menu>

        <div className="personalInfo">
            <Avatar size={40} icon="user" />
            <h2>muer</h2>
        </div>
      </div>
    );
  }
}

export default AdminMenu;