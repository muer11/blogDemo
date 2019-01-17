import React from 'react';
import {Tabs} from 'antd';
import axios from 'axios';
import ContentList from '../contentList/showList';
import Article from '../article/index';
require('./tabsNav.scss');

const TabPane = Tabs.TabPane;

class TabsNav extends React.Component {
    state = { 
        tagInfo: [],
        tabPane: [],
        isList: true, //true:文章列表 false:文章详情
    };

    showArticle = (val, id)=>{
        let isList = val;
        let tagInfo = this.state.tagInfo;
        let tabPane = tagInfo.map((item, index) => (
            <TabPane tab={item.name} key={index}>
                <Article articleId={id} />
            </TabPane>
        ));
        this.setState({
            isList: isList,
            tabPane: tabPane,
        });
    }

    // 动态显示type类下的文章内容
    showList(key) {
        let isList = true;
        let tagInfo = this.state.tagInfo;
        let tabPane = tagInfo.map((item, index) => (
            <TabPane tab={item.name} key={index}>
                {item.content}
            </TabPane>
        ));
        this.setState({
            isList: isList,
            tabPane: tabPane,
        });
    }

    // 文章分类
    showTags = () => {
        const _this = this;
        let tabPane = null;

        axios.get("http://localhost:3000/showTagsFore").then(function (res) {
            const tagArr = res.data.allTags;
            let tagInfo= [{
                tagId: 'all',
                name: '首页',
                content: <ContentList tagId="all" showArticle={_this.showArticle}/>,
            }];

            tagArr.map(function(value, index){
                tagInfo.push({
                    tagId: value.id,
                    name: value.name,
                    content: <ContentList tagId={value.id} showArticle={_this.showArticle}/>,
                });
            });
            tabPane = tagInfo.map((item, index) => (
                <TabPane tab={item.name} key={index}>
                    {item.content}
                </TabPane>
            ));
            _this.setState({
                tagInfo: tagInfo,
                tabPane: tabPane
            })
        })
    }

    componentWillMount(){
        // this.showTags();
    }
    
    componentDidMount(){
        this.showTags();
    }

    render(){
        return (
            <Tabs defaultActiveKey="0" onChange={this.showList.bind(this)}>
                {this.state.tabPane}
            </Tabs>
        )
    }
}

export default TabsNav;