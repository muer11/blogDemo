import React from 'react';
import {Tabs} from 'antd';
import ContentList from '../contentList/showList';
import Article from '../article/index';
require('./tabsNav.scss');

const TabPane = Tabs.TabPane;
const tabs = [{
    name: 'JavaScript',
    content: <ContentList/>,
    article: <Article/>
},{
    name: 'React',
    content: <ContentList/>,
    article: <Article/>
}, {
    name: 'Vue',
    content: <ContentList/>,
    article: <Article/>
}, {
    name: 'Node',
    content: <ContentList/>,
    article: <Article/>
}];


// 获取url中的id
const href = window.location.href;
let params = href
.substring(href.indexOf('?')+1)
.split('&')
.map((query) => query.split('='))
.reduce((params, pairs) => (params[pairs[0]] = pairs[1] || '', params), {});
let tabPane = null;

if (typeof params.id != 'undefined') {
    tabPane = tabs.map((item, index) => (
        <TabPane tab={item.name} key={index}>{item.article}</TabPane>
    ));
}else{
    tabPane = tabs.map((item, index) => (
        <TabPane tab={item.name} key={index}>{item.content}</TabPane>
    ));
}

// 动态显示type类下的文章内容
function callback(key) {
    console.log(key);
    let type = tabs[key].name;
    console.log(type);
}

// function selectType(name) {
//     console.log(name);
// }

class TabsNav extends React.Component {
    render(){
        return (
            <Tabs defaultActiveKey="0" onChange={callback}>
                {tabPane}
            </Tabs>
        )
    }
}

export default TabsNav;