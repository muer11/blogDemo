
import React from 'react';
import {
  Tag, Input, Tooltip, Icon,
} from 'antd';
import axios from 'axios';
import Qs from 'qs';

class EditableTagGroup extends React.Component {
  state = {
    tags: [],  
    inputVisible: false,
    inputValue: '',
    userId: 1,
  };

  // 删除分类， 点击时弹出框提醒是否删除，且该用户的该tag下无相关文章才可以删除
  handleClose = (removedTag) => {
    const _this = this;
    const tags = _this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    axios.post('http://localhost:3000/delTag', Qs.stringify({
      "name": removedTag
    })).then(function (res) {
      console.log(res);
      if (res.data == 1) 
      alert("删除成功");
      _this.setState({
        tags
      });
    });
    
  }

  showInput = () => {
    console.log("showInput");
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    // console.log("handleInputChange:" + e.target.value);
    this.setState({ inputValue: e.target.value });
  }

  // 添加标签
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }else{
      alert("请输入内容");
      return;
    }
    // console.log(tags);
    axios.post('http://localhost:3000/addTag', Qs.stringify({
      "userId": this.state.userId,
      "name": inputValue
    })).then(function (res) {
      console.log(res); 
      // if(res.data == 1) alert("修改成功");
    });
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  componentWillMount(){
    var _this = this;
    axios.get("http://localhost:3000/showTags?userId=" + _this.state.userId).then(function (res) {
      var tagData = res.data.allTags;
      var tagArr = [];
      tagData.map(function(value, index){
        if (tagArr.indexOf(value.name) >= 0) return;
        tagArr.push(value.name);
      });
      _this.setState({
        "tags": tagArr
      })
    }) 
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div className='tag'>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> 文章分类
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;