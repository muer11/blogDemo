import React from 'react';
import axios from 'axios';
import { Avatar } from 'antd';
require('./tips.scss');

class PersonalTips extends React.Component{
    state = {
        username: this.props.name,
        role: this.props.role
    }

    // componentDidMount(){
    //     const _this = this;
    //     axios.get("/api/").then(function (res) {
    //         _this.setState({
    //             username: res.data.username,
    //             role: res.data.role
    //         })
    //     });
    // }

    logout = ()=>{
        const _this = this;
        axios.get("/api/user/logout").then(function (res) {
            let code = res.data.ret_code;
            let msg = res.data.ret_msg;
            if (code == 0) {
                _this.props.logoutCallback(code);
            }else{
            }
            console.log(msg);
        });
    }

    render(){
        let AdminLink = null;
        if (this.state.role == 1) {
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