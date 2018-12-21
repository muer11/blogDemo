import React from 'react';
import { Avatar } from 'antd';
require('./tips.scss');

class PersonalTips extends React.Component{
    render(){
        return (
            <div className='personalTips'>
                <a href='/personal' className='logo'>
                    <Avatar size={64} icon="user" />
                </a>
                <div className='detail'>
                    <p>欢迎muer</p>
                    <p>光临我的博客</p>
                    <a href='/personal'>进入管理界面</a>
                </div>
            </div>
        );
    }
}

export default PersonalTips;