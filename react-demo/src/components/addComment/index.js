import React from 'react';
import {
  Comment, Avatar, Form, Button, List, Input, Icon, Tooltip
} from 'antd';
import moment from 'moment';
import axios from 'axios';  
import Qs from 'qs';
import {getCommentFunc, doCommentFunc} from '../../api/api';
require("./addComment.scss");

const TextArea = Input.TextArea;
// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length >= 1 ? '条留言' : ''}`}
//     itemLayout="horizontal"
//     renderItem={props => <Comment {...props} />}
//   />
// );

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
    allResult: [],
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
  handleSubmit = async () => {
    const commentText = this.state.value;
    if (!commentText) {
      return;
    }
    this.setState({
      submitting: true,
    });

    let formData = Qs.stringify({
      "commentText": commentText,
      "articleId":  this.props.articleId,
    });
    let res = await doCommentFunc(formData);
    console.log(res);

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: this.state.username,
            avatar: this.state.avatar,
            content: this.state.value,
            datetime: moment().fromNow(),
            like: 0,
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  }

  replySubmit = async (parentId, toUserId) => {
    const replyText = this.state.replyValue;
    if (!replyText) {
      return;
    }
    let formData = Qs.stringify({
      "commentText": replyText,
      "articleId": this.props.articleId,
      "parentId": parentId,
      "toUserId": toUserId,
    });
    let res = await doCommentFunc(formData);
    if(res.success){
      alert("留言成功～");
    }
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
    // console.log("------------value-----------")
    // console.log(value); //所有评论的骨架
    let currentComment = null;
    let parentList= null;
    let childs= [];
    this.state.allResult.map((dt, index) => { //首先遍历所有的父元素
      if (dt._id == value.pId){ //得到所有的父节点
        currentComment = this.state.allResult[index];
        parentList =  this.CommentsList(currentComment, index);
      }
      if(value.listArr.length > 0){ //得到所有的子节点
        value.listArr.map((child, i)=>{
          if(dt._id == child){
            childs.push(this.CommentsList(this.state.allResult[index], i));
          }
        })
      }
    })
    return [parentList, childs];
  }

  CommentsList = (value, index)=>{
    console.log(value);
    const _this = this;
    let [author, title] = [null, null];
    let avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    author = value.commentUserId ? value.commentUserId.username : null
    if (value.parentId != null) {
      
      title = (<div><a>{author}</a>回复<a>{value.toUserId}</a></div>)
    } else {
      title = (<div><a>{author}</a></div>)
    }
    return (
      <div className="commentList" key={index}>     
        <Comment
          actions={[
            <div className="Tooltip">
              <div className="replyTime">
                {
                  new Date(value.date.createAt).toLocaleString()
                }
              </div>
              <div className="replyBtn">
                <Tooltip onClick = {
                  () => {
                    this.replyFunc(value._id);
                  }
                }>
                  <Icon type="message"
                    //  onClick={this.replyFunc}
                  />回复
                </Tooltip>
              </div>
              <div className="likeBtn">
                <Tooltip onClick = {
                  () => {
                    // _this.likeFunc(value._id);
                  }
                }>
                  <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>
                  {value.likeNum}
                </Tooltip>
              </div>
              
              {
                this.state.isReplyVisible && this.state.isReplyId == value._id ?
                  <div className="replyEditor">
                    <Editor
                        onChange={_this.replyChange}
                        onSubmit={(e) => {
                            //toUserId: 回复对象-向谁回复中的谁
                            //commentUserId: 回复者-从后台session取登录数据
                            //parentId: 针对的父级回复
                            let toUserId = value.commentUserId ? value.commentUserId._id : null;
                            // let commentUserId = ;
                            let parentId = value.parentId ? value.parentId : value._id;
                            _this.replySubmit(parentId, toUserId)
                          }
                        }
                        value={value}
                    />
                  </div> : null
              }
            </div>
          ]}
          author={title}
          avatar={(
            <Avatar
              src = {avatar}
              alt = {author}
            />
          )}
          content={<p>{value.commentText}</p>}
        >
          {/* {children} */}
        </Comment>
      </div>
    )
  }

  async componentWillMount(){
    let params = "articleId="+this.props.articleId;
    let res = await getCommentFunc(params);
    let allResult = res.data.allResult;
    if(allResult.length == 0) return;

    let resultArr = this.state.resultArr;
    allResult.map((val, index) => {
      if (val.parentId == null) {
        resultArr.push({
          "pId": val._id,
          "listArr": []
        });
      } else if (val.parentId != null) {
        resultArr.map((one, index) => {
          if (one.pId === val.parentId) {
            one.listArr.push(val._id);
          }
        })
      }
    });
    this.setState({
      resultArr: resultArr,
      allResult: allResult,
    });
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
                <div className="childs">
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