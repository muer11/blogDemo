import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import RcUeditor from 'react-ueditor-wrap';
import { Select, Button, Input  } from 'antd';
import './ueditor.scss';

const Option = Select.Option;

class Ueditor extends React.Component {
    state = {
        articleContent: "",
        tagInfo: [],
        tagId: null,
        tagName: '',
        title: '',
        userId: "5c4ea5fa157c342f089688e5",
        articleId: null,
        isEdit: false,
    }

    hanldeUeditorChange = (value) => {
        console.log('RcUeditor', value);
        this.setState({
            articleContent: value
        })
    }

    handleSelectChange = (value) => {
        this.setState({
            tagId: value
        })
    }

    handleInputChange = (e) => {
        var value = e.currentTarget.value;
        this.setState({
            title: value
        })
    } 

    publishFunc = (isPublished) => {
        let url = "";
        const articleId = this.state.articleId;
        const userId = this.state.userId;
        const title = this.state.title;
        const content = this.state.articleContent;
        const tagId = this.state.tagId;
        if (!this.state.isEdit) { // 非编辑
            url = '/api/article/doRecording';
            axios.post(url, Qs.stringify({
                "userId": userId,
                "title": title,
                "content": content,
                "tagId": tagId,
                "isPublished": isPublished,
            })).then(function (res) {
                console.log(res);
            });
        }else{ // 编辑
            url = '/api/article/editRecording';
            axios.post(url, Qs.stringify({
                "articleId": articleId,
                "userId": userId,
                "title": title,
                "content": content,
                "tagId": tagId,
                "isPublished": isPublished,
            })).then(function (res) {
                console.log(res);
            });
        }
    }

    // 保存草稿
    saveArticle = ()=>{
        this.publishFunc("false");
    }

    // 发表文章
    publishArticle = () => {
        this.publishFunc("true");
    }

    // 文章分类
    showTags = ()=>{
        const _this = this;
        axios.get("/api/tag/showTags?userId=" + _this.state.userId).then(function (res) {
            // console.log(res);
            var tagArr = res.data.allTags;
            tagArr.map(function(value, index){
                _this.state.tagInfo.push(value);
            });
            // console.log(_this.state.tagInfo);
        });
    }

    componentWillMount(){
        this.showTags();
    }
    
    componentDidMount(){
        console.log(this.props.articleId);
        if (this.props.articleId != null){
            var articleId = this.props.articleId;
            var _this = this;
            axios.get("/api/article/findOneArticle?articleId=" + articleId).then(function (res) {
                console.log(res);
                var articleInfo = res.data.allResult[0];
                _this.setState({
                    title: articleInfo.title,
                    articleContent: articleInfo.content,
                    isEdit: true,
                    articleId: articleId,
                });
            });
        }
    }

    render() {
        return (
            <div className='ueditor'>
                <div>
                    <div className="contentRight">
                        <Input placeholder="请输入文章标题" name="title" className="title" onChange={this.handleInputChange} value={this.state.title}/>
                    </div>
                </div>
                <RcUeditor onChange = {this.hanldeUeditorChange} value={this.state.articleContent}/>
                <div>
                    <div className="contentRight">
                        <div className="selectType right">
                            文章分类：
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={this.handleSelectChange}
                                // onFocus={handleFocus}
                                // onBlur={handleBlur}
                                defaultValue = {this.state.tagName}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    this.state.tagInfo.map((item, index)=>{
                                        return <Option value={item.id} key={index}>{item.name}</Option>
                                    })
                                }
                                {/* <Option value="Javascript">Javascript</Option>
                                <Option value="Css">Css</Option>
                                <Option value="React">React</Option>
                                <Option value="Vue">Vue</Option>
                                <Option value="Node">Node</Option> */}
                            </Select> 
                        </div>
                        <div className="submi right">
                            <Button className="save"  onClick={this.saveArticle}>保存草稿</Button>
                            <Button type="primary" className="publish" onClick={this.publishArticle}>发表文章</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ueditor;