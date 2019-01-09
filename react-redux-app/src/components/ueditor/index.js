import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import RcUeditor from 'react-ueditor-wrap';
import { Select, Button, Input  } from 'antd';
import './ueditor.scss';

const Option = Select.Option;

class Ueditor extends React.Component {
    state = {
        articleContent: null,
        type: 'Javascript',
        title: '',
    }

    hanldeUeditorChange = (value) => {
        console.log('RcUeditor', value);
        this.setState({
            articleContent: value
        })
    }

    handleSelectChange = (value) => {
        this.setState({
            type: value
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
            "content": this.state.articleContent,
            "title": this.state.title,
            "userId": 1,
            "type": this.state.type,
            "isPublished": false,
        })).then(function (res) {
            console.log(res);
        });
    }

    // 发表文章
    publishArticle = () => {
        axios.post('http://localhost:3000/doRecording', Qs.stringify({
            "content": this.state.articleContent,
            "title": this.state.title,
            "userId": 1,
            "type": this.state.type,
            "isPublished": true,
        })).then(function (res) {
            console.log(res);
        });
    }

    render() {
        return (
            <div className='ueditor'>
                <div>
                    <div className="contentRight">
                        <Input placeholder="请输入文章标题" name="title" className="title" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <RcUeditor onChange = {this.hanldeUeditorChange} />
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
                                defaultValue = "Javascript"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="Javascript">Javascript</Option>
                                <Option value="Css">Css</Option>
                                <Option value="React">React</Option>
                                <Option value="Vue">Vue</Option>
                                <Option value="Node">Node</Option>
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