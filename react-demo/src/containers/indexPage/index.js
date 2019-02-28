import React from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import Slider from '../../components/slider';
import TabsNav from '../../components/tabsNav';
import WrappedNormalLoginForm from '../../components/login';
import ContentList from '../../components/contentList/showList';
import PersonalTips from '../personal/tips';
require('./index.scss');

const {
  Header, Sider, Footer, Content,
} = Layout;

class IndexPage extends React.Component {
    state = {
        login: false, //false:未登录 true:已登录
        username: "",
        role: 0
    }

    logoutCallback(value){
        if(value == 0){
           this.setState({
               login: false
           });
        }else{
            this.setState({
                login: true
            });
        }
    }

    callback(data){
        console.log("-----callback------------")
        console.log(data);
        if(data.ret_code == 0){
            this.setState({
                login: true,
                username: data.ret_msg.name,
                role: data.ret_msg.role,
            });
        }else{
            this.setState({
                login: false,
                username: "",
                    role: 0
            });
        }
    }

    componentDidMount(){
        const _this = this;
        axios.get("/api/user/isLogin").then(function(res) {
            // console.log("--------axios/---------");
            // console.log(res.data.ret_code == 0);
            if(res.data.ret_code == 0){
                _this.setState({
                    login: true,
                    username: res.data.ret_msg.name,
                    role: res.data.ret_msg.role,
                });
                _this.callback(res.data);
            }else{
                _this.setState({
                    login: false,
                    username: "",
                    role: 0
                });
            }
        })
    }

    render(){
        let formInfo = null;
        console.log("---------------")
        console.log(this.state.username);
        if(this.state.login){
            formInfo = <PersonalTips name={this.state.username} role={this.state.role} logoutCallback={this.logoutCallback.bind(this)}/>;
        }else{
            formInfo = <WrappedNormalLoginForm callback={this.callback.bind(this)} />;
        }
        return (
            <Layout>
                <Header>
                    <Slider />
                </Header>
                <Layout>
                    <Content>
                        <TabsNav />
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

export default IndexPage;