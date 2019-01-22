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
    header={`${comments.length} ${comments.length > 1 ? '条回复' : ''}`}
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
    submitting: false,
    value: '',
    replyValue: '',
    action: null,
    userId: 1,
  }

  likeFunc = (id) => {
    console.log(id);
    const _this = this;
    axios.post("http://localhost:3000/pointComment", Qs.stringify({
      "commentId": id,
      "userId": _this.state.userId,
    })).then(function (res) {
      console.log(res);
    });
  }

  replyFunc = (id) => {
    // this.setState({
    //   likes: 1,
    //   dislikes: 0,
    //   action: 'liked',
    // });
    console.log(id);
    
  }

  handleSubmit = () => {
    const _this = this;
    const commentText = this.state.value;
    if (!commentText) {
      return;
    }

    _this.setState({
      submitting: true,
    });

    axios.post("http://localhost:3000/doComment", Qs.stringify({
      "commentText": commentText,
      "commentUserId": _this.state.userId,
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
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{_this.state.value}</p>,
            datetime: moment().fromNow(),
            like: 0,
          },
          ..._this.state.comments,
        ],
      });
    }, 1000);
  }

  replySubmit = (parentId, toUserId) => {
    console.log(parentId);
    console.log(toUserId);
    const _this = this;
    const replyText = this.state.replyValue;
    if (!replyText) {
      return;
    }
    axios.post("http://localhost:3000/doComment", Qs.stringify({
      "commentText": replyText,
      "commentUserId": _this.state.userId,
      "articleId": _this.props.articleId,
      "parentId": parentId,
      "toUserId": toUserId,
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

  componentWillMount(){
    const _this = this;

    axios.post("http://localhost:3000/getComment", Qs.stringify({
      "articleId": _this.props.articleId,
    }), {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then(function (res) {
      // console.log(res);
      let allResult = res.data.allResult;
      let commentsArr = [];
      allResult.map(function (value, index) {
        if(value.userInfo.length > 0){
          console.log(value);
          const actions = [
            <div className="commentOperation">
              <div className="Tooltip">
                <Tooltip title="Like" onClick = {
                  () => {
                    _this.likeFunc(value.id);
                  }
                }>
                  <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>{value.likeNum}
                </Tooltip>
                <Tooltip title="message" onClick = {
                  () => {
                    _this.replyFunc(value.id);
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
                      _this.replySubmit(value.id, value.commentUserId)
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
            author: value.userInfo[0].username,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{value.commentText}</p>,
            datetime: value.date,
            like: value.likeNum,
            actions: actions
          });
        }
      })
      _this.setState({
        submitting: false,
        value: '',
        comments: commentsArr
      });
    })
  }

  render() {
    const { comments, submitting, value, action, likes, dislikes } = this.state;

    return (
      <div className="addComment">
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          // actions={actions}
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          // author={comments.author}
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