import React from 'react';
import {
  Comment, Avatar, Form, Button, List, Input, Icon, Tooltip
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import {getCommentFunc, doCommentFunc, doLikeFunc} from '../../api/api';
import AddComment from '../addComment';
// require("./commentList.scss");

// const TextArea = Input.TextArea;
// // const CommentList = ({ comments }) => (
// //   <List
// //     dataSource={comments}
// //     header={`${comments.length} ${comments.length >= 1 ? '条留言' : ''}`}
// //     itemLayout="horizontal"
// //     renderItem={props => <Comment {...props} />}
// //   />
// // );

// const Editor = ({
//   onChange, onSubmit, submitting, value,
// }) => (
//   <div>
//     <Form.Item>
//       <TextArea rows={4} onChange={onChange}/>
//     </Form.Item>
//     <Form.Item>
//       <Button
//         htmlType="submit"
//         loading={submitting}
//         onClick={onSubmit}
//         type="primary"  
//       >
//         发表
//       </Button>
//     </Form.Item>
//   </div>
// );

class CommentList extends React.Component {
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

  //回复动效
  replyFunc = (id) => {
    this.setState({
      isReplyId: id,
      isReplyVisible: true
    });
    // console.log(id);
    
  }

  //遍历评论
  cycleComments = (value, index) => {
    console.log("------------value-----------")
    console.log(value); //所有评论的骨架
    let {commentListArr=[],resultArr=[]} = this.props;
    // console.log(commentListArr.length);
    let currentComment = null;
    let parentList= null;
    let childs= [];
    console.log("commentListArr:");
    console.log(commentListArr);
    commentListArr.map((dt, index) => { //首先遍历所有的父元素
      console.log(dt);
      console.log(value);
      if (dt._id == value.pId){ //得到所有的父节点
        currentComment = commentListArr[index];
        parentList =  this.CommentsList(currentComment, index);
      }
      if(value.listArr.length > 0){ //得到所有的子节点
        value.listArr.map((child, i)=>{
          if(dt._id == child){
            childs.push(this.CommentsList(commentListArr[index], i));
          }
        })
      }
    })
    return [parentList, childs];
  }

  CommentsList = (value, index)=>{
    // console.log(value);
    const _this = this;
    let [author, title] = [null, null];
    let avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    author = value.commentUserId ? value.commentUserId.username : null
    if (value.parentId != null) {
      title = (<div><a>{author?author:"佚名"}</a>回复<a>{value.toUserId?value.toUserId:"佚名"}</a></div>)
    } else {
      title = (<div><a>{author?author:"佚名"}</a></div>)
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
                    _this.likeFunc(value._id);
                  }
                }>
                  <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>
                  {value.likeNum}
                </Tooltip>
              </div>
              {
                this.state.isReplyVisible && this.state.isReplyId == value._id ?
                  // <div className="replyEditor">
                  //   <Editor
                  //       onChange={_this.replyChange}
                  //       onSubmit={(e) => {
                  //           //toUserId: 回复对象-向谁回复中的谁
                  //           //commentUserId: 回复者-从后台session取登录数据
                  //           //parentId: 针对的父级回复
                  //           let toUserId = value.commentUserId ? value.commentUserId._id : null;
                  //           // let commentUserId = ;
                  //           let parentId = value.parentId ? value.parentId : value._id;
                  //           _this.replySubmit(parentId, toUserId)
                  //         }
                  //       }
                  //       value={value}
                  //   />
                  // </div> 
                  <AddComment 
                    articleId={this.props.articleId} 
                    parentId={value.parentId ? value.parentId : value._id}
                    toUserId={value.commentUserId ? value.commentUserId._id : null}
                  />: null
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

  render() {
    // console.log(this.props.commentListArr);
    let {commentListArr=[],resultArr=[]} = this.props;
    console.log(resultArr.length);
    console.log(resultArr);
    if(resultArr.length>0){
      return (<div className="commentList">     
      {
        Array.prototype.map.call(resultArr, (el, index) => {
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
      }
      </div>)
    }else{
      return null;
    }
    // return (commentListArr.length>0 ? 
    //   (<div className="commentList">     
    //     {
    //       // Array.prototype.map.call(this.state.comments, (el, index) => CommentsList(el, index))
    //      Array.prototype.map.call(this.props.commentListArr, (el, index) => {
    //         let [parentList, childList] = this.cycleComments(el, index);
            
    //         return (
    //           <div key={index}>
    //             {parentList}
    //             <div className="childs">
    //             {
    //               childList.map((c, i)=>{
    //                 return c;
    //               })
    //             }
    //             </div>
    //           </div>
    //         );
    //       })
    //       // this.state.resultArr.map((el, index) => {
    //         // console.log(el);
    //         // this.cycleComments(el, index)
    //       // })
    //     }
        {/* <Comment
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
                    _this.likeFunc(value._id);
                  }
                }>
                  <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>
                  {value.likeNum}
                </Tooltip>
              </div>
              {
                this.state.isReplyVisible && this.state.isReplyId == value._id ?
                  <AddComment/> : null
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
      </Comment> */}
    // </div>
    // ):"");
  }
}

CommentList.PropTypes = {
  commentListArr: PropTypes.array.isRequired,
}

export default CommentList;