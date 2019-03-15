import React from 'react';
import { Avatar } from 'antd';
import { logoutFunc } from './../../api/api';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {logoutUser} from "../../redux/actions/user-actions";
require("./tip.scss");
class PersonalTips extends React.Component{
    state = {
        username: this.props.name,
        role: this.props.role
    }

    logout = () => {
        console.log("logout this.props");
        console.log(this.props);
         const {dispatch} = this.props;
         dispatch(logoutUser());
        // const data = await logoutFunc();
        // this.props.logoutCallback();
    }

    render(){
        console.log("tip console");
        console.log(this.state);
        console.log(this.props);
        let currentUser = this.props.currentUser ? this.props.currentUser : null;
        let AdminLink = null;
        if (currentUser && currentUser.role === 1) {
            AdminLink = <a href='/personal'>进入管理界面</a>;
        }
        return (
            <div className='personalTips'>
                <a href='/personal' className='logo'>
                    <Avatar size={64} icon="user" />
                </a>
                <div className='detail'>
                    <p>欢迎{currentUser ? currentUser.name : null}</p>
                    <p>光临我的博客</p>
                    {AdminLink}
                    <p><a onClick={this.logout}>[退出]</a></p>
                </div>
            </div>
        );
    }
}
PersonalTips.PropTypes = {
    currentUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    console.log("mapStateToProps state")
    console.log(state)
    return {
        currentUser: state.user.currentUser ? state.user.currentUser : null
        // articleList: state.article.articleList
    }
}
export default connect(mapStateToProps)(PersonalTips);