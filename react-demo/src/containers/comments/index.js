import React from 'react';
import {
  Comment, Avatar, Form, Button, List, Input, Icon, Tooltip
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
// import {listArticle} from "../../redux/actions/article-actions";
import {showComments} from "../../redux/actions/comment-actions";
import {getCommentFunc, doCommentFunc, doLikeFunc} from '../../api/api';
import CommentList from "../../components/commentList";
import AddComment from "../../components/addComment";
require("./commentList.scss");

class Comments extends React.Component {
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

  //评论点赞
//   likeFunc = async (id) => {
//     let data = {
//       "commentId": id,
//     };
//     let res = await doLikeFunc(data);
//     console.log(res);
//   }

//   //回复
//   replyFunc = (id) => {
//     this.setState({
//       isReplyId: id,
//       isReplyVisible: true
//     });
//     // console.log(id);
    
//   }
//   //发表评论
//   handleSubmit = async () => {
//     const commentText = this.state.value;
//     if (!commentText) {
//       return;
//     }
//     this.setState({
//       submitting: true,
//     });

//     let formData = {
//       "commentText": commentText,
//       "articleId":  this.props.articleId,
//     };
//     let res = await doCommentFunc(formData);
//     // console.log(res);

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           {
//             author: this.state.username,
//             avatar: this.state.avatar,
//             content: this.state.value,
//             datetime: moment().fromNow(),
//             like: 0,
//           },
//           ...this.state.comments,
//         ],
//       });
//     }, 1000);
//   }

//   replySubmit = async (parentId, toUserId) => {
//     const replyText = this.state.replyValue;
//     if (!replyText) {
//       return;
//     }
//     let formData = {
//       "commentText": replyText,
//       "articleId": this.props.articleId,
//       "parentId": parentId,
//       "toUserId": toUserId,
//     };
//     let res = await doCommentFunc(formData);
//     if(res.success){
//       alert("留言成功～");
//     }
//   }

//   handleChange = (e) => {
//     // console.log(e.target.value);
//     this.setState({
//       value: e.target.value,
//     });
//   }
  
//   replyChange = (e) => {
//     // console.log(e.target.value);
//     this.setState({
//       replyValue: e.target.value,
//     });
//   }

//   cycleComments = (value, index) => {
//     // console.log("------------value-----------")
//     // console.log(value); //所有评论的骨架
//     let currentComment = null;
//     let parentList= null;
//     let childs= [];
//     this.state.allResult.map((dt, index) => { //首先遍历所有的父元素
//       if (dt._id == value.pId){ //得到所有的父节点
//         currentComment = this.state.allResult[index];
//         parentList =  this.CommentsList(currentComment, index);
//       }
//       if(value.listArr.length > 0){ //得到所有的子节点
//         value.listArr.map((child, i)=>{
//           if(dt._id == child){
//             childs.push(this.CommentsList(this.state.allResult[index], i));
//           }
//         })
//       }
//     })
//     return [parentList, childs];
//   }

//   CommentsList = (value, index)=>{
//     // console.log(value);
//     const _this = this;
//     let [author, title] = [null, null];
//     let avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
//     author = value.commentUserId ? value.commentUserId.username : null
//     if (value.parentId != null) {
//       title = (<div><a>{author?author:"佚名"}</a>回复<a>{value.toUserId?value.toUserId:"佚名"}</a></div>)
//     } else {
//       title = (<div><a>{author?author:"佚名"}</a></div>)
//     }
//     return (
//       <div className="commentList" key={index}>     
//         <Comment
//           actions={[
//             <div className="Tooltip">
//               <div className="replyTime">
//                 {
//                   new Date(value.date.createAt).toLocaleString()
//                 }
//               </div>
//               <div className="replyBtn">
//                 <Tooltip onClick = {
//                   () => {
//                     this.replyFunc(value._id);
//                   }
//                 }>
//                   <Icon type="message"
//                     //  onClick={this.replyFunc}
//                   />回复
//                 </Tooltip>
//               </div>
//               <div className="likeBtn">
//                 <Tooltip onClick = {
//                   () => {
//                     _this.likeFunc(value._id);
//                   }
//                 }>
//                   <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>
//                   {value.likeNum}
//                 </Tooltip>
//               </div>
//               {
//                 this.state.isReplyVisible && this.state.isReplyId == value._id ?
//                   <div className="replyEditor">
//                     <Editor
//                         onChange={_this.replyChange}
//                         onSubmit={(e) => {
//                             //toUserId: 回复对象-向谁回复中的谁
//                             //commentUserId: 回复者-从后台session取登录数据
//                             //parentId: 针对的父级回复
//                             let toUserId = value.commentUserId ? value.commentUserId._id : null;
//                             // let commentUserId = ;
//                             let parentId = value.parentId ? value.parentId : value._id;
//                             _this.replySubmit(parentId, toUserId)
//                           }
//                         }
//                         value={value}
//                     />
//                   </div> : null
//               }
//             </div>
//           ]}
//           author={title}
//           avatar={(
//             <Avatar
//               src = {avatar}
//               alt = {author}
//             />
//           )}
//           content={<p>{value.commentText}</p>}
//         >
//           {/* {children} */}
//         </Comment>
//       </div>
//     )
//   }

  componentDidMount(){
    let {dispatch,location} = this.props;
    // let articleId = location.query.id;
    console.log(this.props);
    dispatch(showComments("articleId="+this.props.articleId));
    // let params = "articleId="+this.props.articleId;
    // let res = await getCommentFunc(params);
    // let allResult = res.data.allResult;
    // if(allResult.length == 0) return;

    // let resultArr = this.state.resultArr;
    // allResult.map((val, index) => {
    //   if (val.parentId == null) {
    //     resultArr.push({
    //       "pId": val._id,
    //       "listArr": []
    //     });
    //   } else if (val.parentId != null) {
    //     resultArr.map((one, index) => {
    //       if (one.pId === val.parentId) {
    //         one.listArr.push(val._id);
    //       }
    //     })
    //   }
    // });
    // this.setState({
    //   resultArr: resultArr,
    //   allResult: allResult,
    // });
  }

  render() {
    let {commentList,resultArr} = this.props;
    // console.log(commentList);
    // console.log(resultArr);
    return (
        <div className="comments">
            <CommentList commentListArr={commentList} resultArr={resultArr}/>
            <AddComment/>
        </div>
    );
  }
}

const mapStateToProps = state => {
    console.log("mapStateToProps state")
    console.log(state)
    let {commentList=[]} = state.comments;
    let resultArr = [];
    console.log(commentList);
    if(commentList.length > 0){
        commentList.map((val, index) => {
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
        console.log("resultArr")
        console.log(resultArr)
    }
    return {
        commentList: commentList,
        resultArr: resultArr,
        // articleLike: state.likes.articleLike,
    }
}

Comments.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Comments);