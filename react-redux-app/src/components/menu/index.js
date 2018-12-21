import React from 'react';
import { Avatar } from 'antd';
import { Menu, Icon, Button } from 'antd';
import EditableTagGroup from '../tag/index';
import ManageList from '../contentList/manageList';
// import EditableTagGroup from '../tag/index';
// import EditableTagGroup from '../tag/index';
import './menu.scss';

// const SubMenu = Menu.SubMenu;

class AdminMenu extends React.Component {
  constructor(){
    super();
    this.state = {
      itemName: ''
    }
  }
//   state = {
//     collapsed: false,
//   }

//   toggleCollapsed = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   }

  callback = (item) => {
    console.log(item);
    let itemName = '';
    switch (item.key) {
      case 'index':
        // itemName = 'index';
        break;
      case 'article':
        itemName = 'article';
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
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button> */}
        <Menu
          defaultSelectedKeys={['article']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onSelect={this.callback.bind(this)}
        //   theme="dark"
        //   inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="index">
            <a href='/article'>首页</a>
          </Menu.Item>
          <Menu.Item key="article">
            <span>文章管理</span>
          </Menu.Item>
          <Menu.Item key="tag">
            <span>标签管理</span>
          </Menu.Item>
          <Menu.Item key="comment">
            <span>评论管理</span>
          </Menu.Item>
          <Menu.Item key="user">
            <span>用户管理</span>
          </Menu.Item>
          {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
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