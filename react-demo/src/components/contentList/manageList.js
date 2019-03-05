// admin 文章列表
import React from 'react';
import { List, Icon, Select, Modal } from 'antd';
import axios from 'axios';
import Qs from 'qs';
import {
    delArticleFunc,
    getArticleFunc,
    showTagsFunc
} from './../../api/api';
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
        visible: false,
        listData: [], // 文章数据
        page: 1,
        type: 'all', // 分类
        tagInfo: [],
        sort: 'date', // 排序
        // userId: "5c481ca1a464d763b8e74b38",
    }

    showModal = ()=>{
        console.log("showModal-------");
        this.setState({
            visible: true,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
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
        if (this.props.editArticle){
            this.props.editArticle(articleId);
        }
    }

    // 删除文章
    deleteArticle = async (articleId) => {
        let data = Qs.stringify({
            "articleId": articleId
        });
        let res = await delArticleFunc(data);
        console.log("deleteArticle:");
        console.log(res);
        // axios.post("/api/article/delArticle", ).then(function (res) {
        //     console.log(res);
        //     if(res.data === 1){

        //     }
        // });
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.type !== nextState.type || this.state.sort !== nextState.sort || this.state.listData !== nextState.listData) {
            return true;
        }else{
            return false;
        }
    }

    showListData = async () => {
        const _this = this;
        let params = "isPublished=true&page=0&tagId=" + this.state.type + "&sort=" + this.state.sort;
        let res = await getArticleFunc(params);
        console.log(res);
        let data = res.data.allResult;
        let listInfo = [];
        if (data.length > 0) {
            const length = data.length;
            for (let i = 0; i < length; i++) {
                if (!data[i].title) continue;
                var type = "";
                var date = new Date(data[i].date.updateAt).toLocaleString();
                this.state.tagInfo.map((value, index) => {
                    if (value._id === data[i].tagId) {
                        type = value.name;
                    }
                });
                listInfo.push({
                    id: data[i]._id,
                    userid: data[i].userid,
                    type: type,
                    title: data[i].title,
                    href: 'http://ant.design',
                    likeNum: data[i].likeNum,
                    visitNum: data[i].visitNum,
                    date: date,
                    // content: data[i].content,
                });
            }
        }
        this.setState({
            listData: listInfo
        });
        // axios.get("/api/article/getArticle?isPublished=true&page=0&tagId=" + _this.state.type + "&sort=" + _this.state.sort).then(function (res) {
        // });
    }

    showTags = async () => {
        const _this = this;
        let res = await showTagsFunc();
        console.log("showTags:")
        console.log(res);
        let tagArr = res.data.allTags;
        tagArr.map(function (value, index) {
            _this.state.tagInfo.push(value);
        });
        // axios.get("/api/tag/showTags").then(function (res) {
        // });
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
                                return <Option value={item._id} key={index}>{item.name}</Option>
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
                        <Option value="visitNum">浏览量</Option>
                        <Option value="likeNum">点赞量</Option>
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
                        actions={[<IconText type="" text={item.type} />,<IconText type="like-o" text={item.likeNum} />, <IconText type="time" text={item.date} />, <a onClick={()=>{this.editArticle(item.id)}}>编辑</a>, <a onClick={()=>{this.deleteArticle(item.id)}}>删除</a>, <a href={"/article?id="+item.id} target="_blank">查看</a>]}
                        // {()=>{this.editArticle(item.id)}}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                        />
                        {/* <div>{item.content}</div> */}
                    </List.Item>
                    )}
                />
                        <Modal
                            visible={this.state.visible}
                            // onOk={this.deleteArticle(item.id)}
                            // onCancel={this.handleCancel}
                        >
                            <p>您确定要删除此文章嘛？</p>
                            {
                                
                                console.log("------"+this.state.visible)
                            }
                        </Modal>
            </div>
        )
    }
}

export default ManageList;