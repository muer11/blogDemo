// admin 文章列表

import React from 'react';
import { List, Avatar, Icon, Button, Select } from 'antd';
import axios from 'axios';
import Qs from 'qs';
import './manageList.scss';


const Option = Select.Option;
// let listData = [];
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ManageList extends React.Component{
    state = {
        listData: [], // 文章数据
        page: 1,
        type: 'all', // 分类
        sort: 'date', // 排序
    }

    handleTypeChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            type: value
        });
        // this.showListData();
    }
    handleSortChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            sort: value
        });
        // this.showListData();
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if(this.state.type !== nextState.type || this.state.sort !== nextState.sort){
    //         this.showListData();
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    showListData = () => {
        const tar = this;
        axios.get("http://localhost:3000/getArticle?userId=1&isPublished=true&page=1&type=" + tar.state.type + "&sort=" + tar.state.sort).then(function (res) {
            console.log(res);
            let data = res.data.allResult;
            let listInfo = [];
            const length = data.length;
            for (let i = 0; i < length; i++) {
                if (!data[i].title) continue;
                listInfo.push({
                    href: 'http://ant.design',
                    title: data[i].title,
                    like: data[i].goodNum,
                    type: data[i].type,
                    date: data[i].date,
                    userid: data[i].ID,
                    // content: data[i].content,
                });
            }
            tar.setState({
                listData: listInfo
            });
        });
    }

    componentWillMount(){
        this.showListData();  // 二次渲染导致页面有颤抖？？？
    }

    render(){
        console.log(this.state.listData);

        return (
            <div className="manageList">
                <div className="selectItem content">
                    文章分类：
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={this.handleTypeChange}
                        defaultValue= "all"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="all">全部</Option>
                        <Option value="Javascript">Javascript</Option>
                        <Option value="Css">Css</Option>
                        <Option value="React">React</Option>
                        <Option value="Vue">Vue</Option>
                        <Option value="Node">Node</Option>
                    </Select> 
                    排序：
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={this.handleSortChange}
                        defaultValue = "date"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="date">时间</Option>
                        {/* <Option value="阅读量">阅读量</Option> */}
                        <Option value="like">点赞量</Option>
                    </Select> 
                </div>
                <List
                    className="content"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={this.state.listData}
                    // footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        //<IconText type="star-o" text="156" />,<IconText type="message" text="2" />,
                        actions={[<IconText type="" text={item.type} />,<IconText type="like-o" text={item.like} />, <IconText type="time" text={item.date} />, <a>编辑</a>, <a>删除</a>, <a>查看</a>]}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                        />
                        {/* <div>{item.content}</div> */}
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ManageList;