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
    isReplyVisible:false,
    isReplyId:"",
    submitting: false,
    value: '',
    replyValue: '',
    action: null,
    username: "muer",
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
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

  CommentsList = (value, index)=>{
    console.log("------------value--------------");
    console.log(value);
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
              this.state.isReplyVisible && this.state.isReplyId == value._id?
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
  )}

  componentWillMount(){
    const _this = this;

    axios.post("/api/comment/getComment", Qs.stringify({
      "articleId": _this.props.articleId,
    }), {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then(function (res) {
      // console.log(res);
      let allResult = res.data.allResult;
      if(allResult.length == 0) return;
      
      let commentsArr = [];
      allResult.map(function (value, index) {
        console.log(value);
        if(value.parentId != null){
          let childrenList = [];
        }

        // if(value.userInfo.length > 0){
        //   console.log(value);
          const actions = [
            <div className="commentOperation">
              <div className="Tooltip">
                <Tooltip title="Like" onClick = {
                  () => {
                    _this.likeFunc(value._id);
                  }
                }>
                  <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>{value.likeNum}
                </Tooltip>
                <Tooltip title="message" onClick = {
                  () => {
                    _this.replyFunc(value._id);
                  }
                }>
                  <Icon type="message"  onClick={_this.replyFunc}/>回复
                </Tooltip>
              </div>
              <Comment
                content={(
                  <Editor
                    onChange={_this.replyChange}
                    onSubmit={(e)=>{
                      _this.replySubmit(value._id)
                      }
                    }
                    submitting={_this.state.submitting}
                    value={value}
                  />
                )}
              />
            </div>
          ];
          commentsArr.push({
            author: "muer",
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: value.commentText,
            datetime: value.date.updateAt,
            like: value.likeNum,
            actions: actions,
            _id: value._id,
          });
        // }
      })
      console.log("---------------commentsArr--------------");
      console.log(commentsArr);
      _this.setState({
        submitting: false,
        value: '',
        comments: commentsArr
      });
    })
  }

  render() {
    const { comments, submitting, value, action, likes, dislikes } = this.state;
    const CommentsList = this.CommentsList;
    const data= [{
      articleId: "5c70fdda277b6a44c0a763a0",
      commentText: "13",
      commentUserId: null,
      date: {createAt: "2019-02-23T07:42:26.562Z", updateAt: "2019-02-23T07:42:26.562Z"},
      likeNum: 0,
      parentId: null,
      replyNum: 0,
      status: 1,
      toUserId: 1,
      __v: 0,
      _id: "5c710177277b6a44c0a763a1",
    },{
      articleId: "5c70fdda277b6a44c0a763a0",
      commentText: "1233",
      commentUserId: null,
      date: {createAt: "2019-02-23T07:42:26.562Z", updateAt: "2019-02-23T07:42:26.562Z"},
      likeNum: 0,
      parentId: null,
      replyNum: 0,
      status: 1,
      toUserId: 2,
      __v: 0,
      _id: "5c710177277b6a44c0a763a2",
    }];
    let data2 = [
      {
        __v:0,
        _id:"5c739e13c2e403160409811d",
        articleId:"5c62904dcfe97018b02f3f62",
        commentText:"你嘲讽给你个",
        date:{createAt: "2019-02-25T01:24:04.953Z", updateAt: "2019-02-25T01:24:04.953Z"},
        likeNum:0,
        parentId:null,
        replyNum:0,
        status:1,
        toUserId:null
      },
    ];
    console.log("---------------this.state.comments--------------");
    console.log(this.state.comments);
    return (
      <div className="addComment">
        {
          Array.prototype.map.call(this.state.comments, (el, index) => CommentsList(el, index))
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