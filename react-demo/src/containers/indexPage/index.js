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
    }

    logoutCallback(value){
        if(value == 1){
           this.setState({
               login: false
           });
        }else{
            this.setState({
                login: true
            });
        }
    }

    callback(value){
        if(value == 1){
            this.setState({
                login: true
            });
        }else{
            this.setState({
                login: false
            });
        }
    }

    componentDidMount(){
        const _this = this;
        axios.get("/api/").then(function(res) {
            console.log("--------axios/---------");
            console.log(res.data.ret_code == 0);
            if(res.data.ret_code == 0){
                _this.setState({
                    login: true
                });
            }else{
                _this.setState({
                    login: false
                });
            }
        })
    }

    render(){
        let formInfo = null;
        if(this.state.login){
            formInfo = <PersonalTips logoutCallback={this.logoutCallback.bind(this)}/>;
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