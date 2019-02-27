import React from 'react';
import {
  Comment, Avatar, Form, Button, List, Input, Icon, Tooltip
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import Qs from 'qs';
require("./addComment.scss");

const TextArea = Input.TextArea;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length >= 1 ? '条留言' : ''}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange}/>
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        发表
      </Button>
    </Form.Item>
  </div>
);

class AddComment extends React.Component {
  state = {
    comments: [],
    resultArr: [],
    isReplyVisible:false,
    isReplyId:"",
    submitting: false,
    value: '',
    replyValue: '',
    action: null,
    username: "muer",
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    data2: [{
      _id: "5c739e13c2e4031604098d111",
      author: "muer222",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d111",
      datetime: "2019-02-25T01:24:04.953Z",
      like: 0,
      parentId: null,
      commentUserId: "111",
      toUserId: null
    }, {
      _id: "5c739e13c2e4031604098d222",
      author: "muer111",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d222",
      datetime: "2019-02-26T01:24:04.953Z",
      like: 0,
      parentId: "5c739e13c2e4031604098d111",
      commentUserId: "222",
      toUserId: "111"
    }, {
      _id: "5c739e13c2e4031604098d333",
      author: "muer222",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d333",
      datetime: "2019-02-27T01:24:04.953Z",
      like: 0,
      parentId: "5c739e13c2e4031604098d111",
      commentUserId: "111",
      toUserId: "222"
    }, {
      _id: "5c739e13c2e4031604098d444",
      author: "muer222",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d111",
      datetime: "2019-02-25T01:24:04.953Z",
      like: 0,
      parentId: null,
      commentUserId: "111",
      toUserId: null
    }, {
      _id: "5c739e13c2e4031604098d555",
      author: "muer111",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d222",
      datetime: "2019-02-26T01:24:04.953Z",
      like: 0,
      parentId: "5c739e13c2e4031604098d444",
      commentUserId: "222",
      toUserId: "111"
    }, {
      _id: "5c739e13c2e4031604098d666",
      author: "muer222",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d333",
      datetime: "2019-02-27T01:24:04.953Z",
      like: 0,
      parentId: "5c739e13c2e4031604098d111",
      commentUserId: "111",
      toUserId: "222"
    }, {
      _id: "5c739e13c2e4031604098d777",
      author: "muer222",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "d333",
      datetime: "2019-02-27T01:24:04.953Z",
      like: 0,
      parentId: "5c739e13c2e4031604098d111",
      commentUserId: "111",
      toUserId: "222"
    }]
  }

  likeFunc = (id) => {
    console.log(id);
    const _this = this;
    axios.post("/api/comment/pointComment", Qs.stringify({
      "commentId": id,
      "userId": _this.state.userId,
    })).then(function (res) {
      console.log(res);
    });
  }
  //回复
  replyFunc = (id) => {
    this.setState({
      isReplyId: id,
      isReplyVisible: true
    });
    console.log(id);
    
  }
  //发表评论
  handleSubmit = () => {
    const _this = this;
    const commentText = this.state.value;
    if (!commentText) {
      return;
    }

    _this.setState({
      submitting: true,
    });

    axios.post("/api/comment/doComment", Qs.stringify({
      "commentText": commentText,
      // "commentUserId": _this.state.userId,
      "articleId":  _this.props.articleId,
    }), {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (res) {
      console.log(res);
    });

    setTimeout(() => {
      _this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: _this.state.username,
            avatar: _this.state.avatar,
            content: _this.state.value,
            datetime: moment().fromNow(),
            like: 0,
          },
          ..._this.state.comments,
        ],
      });
    }, 1000);
  }

  replySubmit = (parentId) => {
    console.log(parentId);
    // console.log(toUserId);
    const _this = this;
    const replyText = this.state.replyValue;
    if (!replyText) {
      return;
    }
    axios.post("/api/comment/doComment", Qs.stringify({
      "commentText": replyText,
      // "commentUserId": _this.state.userId,
      "articleId": _this.props.articleId,
      "parentId": parentId,
      // "toUserId": toUserId,
    }), {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then(function (res) {
      console.log(res);
      if (res.ret_code == 1){
        alert("请先登录");
      }
      if(res.data == 1){
        alert("发表成功");
      }
    });
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  
  replyChange = (e) => {
    console.log(e.target.value);
    this.setState({
      replyValue: e.target.value,
    });
  }

  cycleComments = (value, index) => {
    // console.log(this.state.data2);
    // console.log("------------value-----------")
    console.log(value); //所有评论的骨架
    
    let currentComment = null;
    let parentList= null;
    let childs= [];
    this.state.data2.map((dt, index)=>{ //首先遍历所有的父元素
      // console.log(dt._id);
      // console.log(value.pId);
      if (dt._id == value.pId){ //得到所有的父节点
        currentComment = this.state.data2[index];
        parentList =  this.CommentsList(currentComment, index);
      }
      if(value.listArr.length > 0){ //得到所有的子节点
        value.listArr.map((child, i)=>{
          console.log("child:"+child);
          if(dt._id == child){
            childs.push(this.CommentsList(this.state.data2[index], i));
          }
        })
      }
    })
    console.log(childs);
    return [parentList, childs];
  }

  CommentsList = (value, index)=>{
    const _this = this;
    return (
      <div className="commentList" key={index}>     
        <Comment
          actions={[
            <div className="Tooltip">
              <Tooltip onClick = {
                () => {
                  // _this.likeFunc(value._id);
                }
              }>
                <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>
                {/* {value.likeNum} */}
              </Tooltip>
              <Tooltip onClick = {
                () => {
                  this.replyFunc(value._id);
                }
              }>
                <Icon type="message"
                  //  onClick={this.replyFunc}
                />回复
              </Tooltip>
              {
                this.state.isReplyVisible && this.state.isReplyId == value._id ?
                  <Editor
                      onChange={_this.replyChange}
                      onSubmit={(e) => {
                          _this.replySubmit(value._id)
                        }
                      }
                      value={value}
                  /> : null
              }
            </div>
          ]}
          author={<a>{value.author}</a>}
          avatar={(
            <Avatar
              src = {value.avatar}
              alt = {value.author}
            />
          )}
          content={<p>{value.content}</p>}
        >
          {/* {children} */}
        </Comment>
      </div>
    )
  }

  componentWillMount(){
    const _this = this;

    let data = this.state.data2;
    let resultArr = this.state.resultArr;
    data.map((val, index)=>{
      if(val.parentId == null){
        resultArr.push({"pId": val._id, "listArr":[]});
      }else if(val.parentId != null){
        resultArr.map((one, index)=>{
          if (one.pId === val.parentId) {
            one.listArr.push(val._id);
          }
        })
      }
    });
    this.setState({
      "resultArr": resultArr
    })

    // console.log("------------resultArr-----------");
    // console.log(resultArr);
  //   axios.get("/api/comment/getComment?articleId="+_this.props.articleId).then(function (res) {
  //     // console.log(res);
  //     let allResult = res.data.allResult;
  //     if(allResult.length == 0) return;
      
  //     let commentsArr = [];
  //     allResult.map(function (value, index) {
  //       console.log(value);
  //       if(value.parentId != null){
  //         let childrenList = [];
  //       }

  //       // if(value.userInfo.length > 0){
  //       //   console.log(value);
  //         const actions = [
  //           <div className="commentOperation">
  //             <div className="Tooltip">
  //               <Tooltip title="Like" onClick = {
  //                 () => {
  //                   _this.likeFunc(value._id);
  //                 }
  //               }>
  //                 <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>{value.likeNum}
  //               </Tooltip>
  //               <Tooltip title="message" onClick = {
  //                 () => {
  //                   _this.replyFunc(value._id);
  //                 }
  //               }>
  //                 <Icon type="message"  onClick={_this.replyFunc}/>回复
  //               </Tooltip>
  //             </div>
  //             <Comment
  //               content={(
  //                 <Editor
  //                   onChange={_this.replyChange}
  //                   onSubmit={(e)=>{
  //                     _this.replySubmit(value._id)
  //                     }
  //                   }
  //                   submitting={_this.state.submitting}
  //                   value={value}
  //                 />
  //               )}
  //             />
  //           </div>
  //         ];
  //         commentsArr.push({
  //           author: "muer",
  //           avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //           content: value.commentText,
  //           datetime: value.date.updateAt,
  //           like: value.likeNum,
  //           actions: actions,
  //           _id: value._id,
  //           parentId: value.parentId,
  //         });
  //       // }
  //     })
  //     console.log("---------------commentsArr--------------");
  //     console.log(commentsArr);
  //     _this.setState({
  //       submitting: false,
  //       value: '',
  //       comments: commentsArr
  //     });
  //   })
  }

  render() {
    const { comments, submitting, value, action, likes, dislikes } = this.state;
    const CommentsList = this.CommentsList;

    return (
      <div className="addComment">
        {
          // Array.prototype.map.call(this.state.comments, (el, index) => CommentsList(el, index))
         Array.prototype.map.call(this.state.resultArr, (el, index) => {
            let [parentList, childList] = this.cycleComments(el, index);
            
            return (
              <div key={index}>
                {parentList}
                <div className="childs" style={{"backgroundColor":"red"}}>
                {
                  childList.map((c, i)=>{
                    return c;
                  })
                }
                </div>
              </div>
            );
          })
          // this.state.resultArr.map((el, index) => {
            // console.log(el);
            // this.cycleComments(el, index)
          // })
        }
        <Comment
          // actions={actions}
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt={this.state.author}
            />
          )}
          author={this.state.author}
          content={(
            <Editor  
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          )}
        />
      </div>
    );
  }
}

export default AddComment;