import React from 'react';
// import { Router, Route, Link } from 'react-router'
import { Layout } from 'antd';
import Slider from '../../components/slider';
import TagList from '../tagList';
import Login from '../login';
import PersonalTips from '../tip/tip';
// import {isLoginFunc} from './../../api/api';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import {isLogin} from "../../redux/actions/user-actions";
require('./index.scss');

const {
  Header, Sider, Footer, Content,
} = Layout;

class IndexPage extends React.Component {
    state = {
        login: false, //false:未登录 true:已登录
        username: null,
        role: 0
    }

    // logoutCallback(value){
    //     if(value == 0){
    //        this.setState({
    //            login: false
    //        });
    //     }else{
    //         this.setState({
    //             login: true
    //         });
    //     }
    // }

    // callback(res){
    //     console.log("-----callback------------")
    //     console.log(res);
    //     if (res.code == 0) {
    //         this.setState({
    //             login: true,
    //             username: res.data.name,
    //             role: res.data.role,
    //         });
    //     }else{
    //         this.setState({
    //             login: false,
    //             username: null,
    //             role: 0
    //         });
    //     }
    // }

    // async componentDidMount(){
    //     // const _this = this;
    //     const isloginData = await isLoginFunc();
    //     // console.log("-----------islogin-----------");
    //     // console.log(isloginData);
    //     if (isloginData.code == 0) {
    //         this.setState({
    //             login: true,
    //             username: isloginData.data.name,
    //             role: isloginData.data.role,
    //         });
    //         this.callback(isloginData);
    //     }else{
    //         this.setState({
    //             login: false,
    //             username: null,
    //             role: 0
    //         });
    //     }
        // axios.get("/api/user/isLogin").then(function(res) {
        //     // console.log("--------axios/---------");
        //     // console.log(res.data.ret_code == 0);
        //     if(res.data.ret_code == 0){
        //         _this.setState({
        //             login: true,
        //             username: res.data.ret_msg.name,
        //             role: res.data.ret_msg.role,
        //         });
        //         _this.callback(res.data);
        //     }else{
        //         _this.setState({
        //             login: false,
        //             username: "",
        //             role: 0
        //         });
        //     }
        // })
    // }

    render(){
        let formInfo = null;
        // console.log("---------------");
        // console.log(this.props);
        // console.log(cookie.load("token"));
        // console.log(Boolean(this.props.currentUser));
        if (this.props.currentUser || cookie.load("token")) {
            formInfo = <PersonalTips name={this.state.username} role={this.state.role}/>;
            // logoutCallback={this.logoutCallback.bind(this)}
        }else{
            formInfo = <Login />;
            // callback={this.callback.bind(this)}
        }
        return (
            
            <Layout>
                <Header>
                    <Slider />
                </Header>
                <Layout>
                    <Content>
                        <TagList/>
                        {/* <ArticleList /> */}
                        {/* <TabsNav /> */}
                        {/* <ContentList /> */}
                    </Content>
                    <Sider>
                        {formInfo}
                    </Sider>
                </Layout>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    console.log("indexPage mapStateToProps state")
    console.log(state)
    return {
        currentUser: state.user.currentUser ? state.user.currentUser : null
    }
}

IndexPage.PropTypes = {
    currentUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(IndexPage);