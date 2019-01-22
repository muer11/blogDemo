// admin 文章列表

import React from 'react';
import { List, Avatar, Icon, Button, Select } from 'antd';
import axios from 'axios';
import Qs from 'qs';
import '../contentList/manageList.scss';

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
        tagInfo: [],
        sort: 'date', // 排序
        userId: 1, 
    }

    // 文章分类
    handleTypeChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            type: value
        },()=>{
            this.showListData();
        });
    }
    // 文章排序
    handleSortChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            sort: value
        }, () => {
            this.showListData();
        });
    }
    // 编辑文章
    editArticle = (articleId) => {
        console.log(articleId);
        if (this.props.editArticle){
            this.props.editArticle(articleId);
        }
    }

    deleteArticle = (articleId) => {
        axios.post("http://localhost:3000/delArticle",Qs.stringify({
            "articleId": articleId
        })).then(function (res) {
            console.log(res);
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.type !== nextState.type || this.state.sort !== nextState.sort || this.state.listData !== nextState.listData) {
            return true;
        }else{
            return false;
        }
    }

    showListData = () => {
        const _this = this;
        axios.get("http://localhost:3000/getArticle?isPublished=false&page=0&userId=" + _this.state.userId + "&tagId=" + _this.state.type + "&sort=" + _this.state.sort).then(function (res) {
            console.log(res);
            let data = res.data.allResult;
            let listInfo = [];
            const length = data.length;
            for (let i = 0; i < length; i++) {
                if (!data[i].title) continue;
                var tagId = parseInt(data[i].tagId);
                var type = "";
                _this.state.tagInfo.map((value, index)=>{
                    if (value.id == tagId){
                        type = value.name;
                    }
                });
                listInfo.push({
                    id: data[i].id,
                    userid: data[i].userid,
                    type: type,
                    title: data[i].title,
                    href: 'http://ant.design',
                    likeNum: data[i].likeNum,
                    visitNum: data[i].visitNum,
                    date: data[i].date,
                    // content: data[i].content,
                });
            }
            _this.setState({
                listData: listInfo
            });
        });
    }

    showTags = () => {
        const _this = this;
        axios.get("http://localhost:3000/showTags?userId=" + _this.state.userId).then(function (res) {
            var tagArr = res.data.allTags;
            tagArr.map(function (value, index) {
                _this.state.tagInfo.push(value);
            });
            console.log(_this.state.tagInfo);
        });
    }
    
    componentWillMount() {
        this.showTags();
        this.showListData();  // 二次渲染导致页面有颤抖？？？
    }

    render(){
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
                        {
                            this.state.tagInfo.map((item, index)=>{
                                return <Option value={item.id} key={index}>{item.name}</Option>
                            })
                        }
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
                        actions={[<IconText type="" text={item.type} />, <IconText type="time" text={item.date} />, <a onClick={()=>{this.editArticle(item.id)}}>编辑</a>, <a onClick={()=>{this.deleteArticle(item.id)}}>删除</a>]}
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