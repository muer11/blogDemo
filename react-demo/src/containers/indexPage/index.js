import React from 'react';
import { Layout } from 'antd';
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
        login: false,
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

    render(){
        let formInfo = null;
        if(this.state.login){
            formInfo = <PersonalTips/>;
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