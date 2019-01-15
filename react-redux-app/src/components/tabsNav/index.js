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
        tabPane: []
    };

    // 文章分类
    showTags = () => {
        const href = window.location.href; // 获取url中的id
        const _this = this;
        let tabPane = null;
        let params = href
            .substring(href.indexOf('?') + 1)
            .split('&')
            .map((query) => query.split('='))
            .reduce((params, pairs) => (params[pairs[0]] = pairs[1] || '', params), {});

        axios.get("http://localhost:3000/showTagsFore").then(function (res) {
            const tagArr = res.data.allTags;
            let tagInfo= [{
                tagId: 'all',
                name: '首页',
                content: <ContentList tagId="all"/>,
                article: <Article/>
            }];

            tagArr.map(function(value, index){
                tagInfo.push({
                    tagId: value.id,
                    name: value.name,
                    content: <ContentList tagId={value.id}/>,
                    article: <Article tagId={value.id}/>,
                });
            });
            
            if (typeof params.tagId != 'undefined') {
                tabPane = tagInfo.map((item, index) => (
                    <TabPane tab={item.name} key={index}>222
                        {item.article}
                    </TabPane>
                ));
            }else{
                tabPane = tagInfo.map((item, index) => (
                    <TabPane tab={item.name} key={index}> 1111
                        {item.content}
                    </TabPane>
                ));
            }
            _this.setState({
                tagInfo: tagInfo,
                tabPane: tabPane
            })
        })
    }

    // 动态显示type类下的文章内容
    // callback(key) {
    //     console.log(key);
    //     let type = this.state.tagInfo[key].name;
    //     console.log(type);
    // }

    componentWillMount(){
        // this.showTags();
    }
    
    componentDidMount(){
        this.showTags();
    }

    render(){
        console.log("tabPaneRender:"+this.state.tabPane)
        return (
            <Tabs defaultActiveKey="0" onChange={this.callback}>
                {this.state.tabPane}
            </Tabs>
        )
    }
}

export default TabsNav;