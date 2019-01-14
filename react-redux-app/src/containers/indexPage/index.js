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
    render(){
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
                        <WrappedNormalLoginForm />
                        {/* <PersonalTips/> */}
                    </Sider>
                </Layout>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        );
    }
}

export default IndexPage;