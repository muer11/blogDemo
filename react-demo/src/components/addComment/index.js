import React from 'react';
import {
  Comment, Avatar, Form, Button, List, Input, Icon, Tooltip
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import Qs from 'qs';

const TextArea = Input.TextArea;


const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class AddComment extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    action: null,
    // likes: 0,
    // dislikes: 0,
    userId: 1,
  }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  }

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
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

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
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
          const actions = [
            <span>
              <Tooltip title="Like">
                <Icon type="like" theme={'liked' === 'liked' ? 'filled' : 'outlined'} onClick={_this.like}/>
              </Tooltip>
              <span style={{ paddingLeft: 0, cursor: 'auto' }}>{value.likeNum}</span>
            </span>,
            <span>
              <Tooltip title="Dislike">
                <Icon type="dislike" theme={'disliked' !== 'disliked' ? 'filled' : 'outlined'} onClick={_this.dislike}/>
              </Tooltip>
              <span style={{ paddingLeft: 0, cursor: 'auto' }}>0</span>
            </span>,
            <span>Reply to</span>,
          ];
          commentsArr.push({
            author: value.userInfo[0].username,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{value.commentText}</p>,
            datetime: value.date,
            like: value.likeNum,
            actions: actions
            // dislikes: value,
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
      <div>
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