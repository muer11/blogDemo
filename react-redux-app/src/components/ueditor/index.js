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
        userId: 1,
        articleId: null
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

    // 保存草稿
    saveArticle = ()=>{
        axios.post('http://localhost:3000/doRecording', Qs.stringify({
            "userId": this.state.userId,
            "title": this.state.title,
            "content": this.state.articleContent,
            "tagId": this.state.tagId,
            "isPublished": false,
        })).then(function (res) {
            console.log(res);
        });
    }

    // 发表文章
    publishArticle = () => {
        axios.post('http://localhost:3000/doRecording', Qs.stringify({
            "userId": this.state.userId,
            "title": this.state.title,
            "content": this.state.articleContent,
            "tagId": this.state.tagId,
            "isPublished": true,
        })).then(function (res) {
            console.log(res);
        });
    }

    // 文章分类
    showTags = ()=>{
        const _this = this;
        axios.get("http://localhost:3000/showTags?userId=" + _this.state.userId).then(function (res) {
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
        var articleId = this.props.articleId;
        var _this = this;
        axios.get("http://localhost:3000/findOneArticle?articleId=" + articleId).then(function (res) {
            console.log(res);
            var articleInfo = res.data.allResult[0];
            _this.setState({
                title: articleInfo.title,
                articleContent: articleInfo.content,
                
            });
        });
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
                                        return <Option value={item.id}>{item.name}</Option>
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