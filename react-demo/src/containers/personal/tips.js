import React from 'react';
import axios from 'axios';
import { Avatar } from 'antd';
import { logoutFunc } from './../../api/api';
require('./tips.scss');

class PersonalTips extends React.Component{
    state = {
        username: this.props.name,
        role: this.props.role
    }

     logout = async() => {
        const data = await logoutFunc();
        this.props.logoutCallback(data.code);
    }

    render(){
        let AdminLink = null;
        if (this.state.role === 1) {
            AdminLink = <a href='/personal'>进入管理界面</a>;
        }
        return (
            <div className='personalTips'>
                <a href='/personal' className='logo'>
                    <Avatar size={64} icon="user" />
                </a>
                <div className='detail'>
                    <p>欢迎{this.state.username}</p>
                    <p>光临我的博客</p>
                    {AdminLink}
                    <p><a onClick={this.logout}>[退出]</a></p>
                </div>
            </div>
        );
    }
}

export default PersonalTips;