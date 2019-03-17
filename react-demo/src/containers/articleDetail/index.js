import React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {showArticleDetail,} from "../../redux/actions/article-actions";
import {sumArticleLike,} from "../../redux/actions/like-actions";
// import CommentList from '../../components/commentList'; 
// import AddComment from "../../components/addComment"
// import ShowComment from '../showComment/index';
import Comments from "../comments";
import { Icon, Tooltip } from 'antd';
// import { findOneArticleFunc, doLikeFunc, sumLikeFunc } from './../../api/api';
require('./article.scss');

class ArticleDetail extends React.Component{
    state={
        title: "",
        content: "",
        likeNum: 0,
        isLike: false,
        tagType: "",
        writer: "",
        publishTime: "", 
        articleId: this.props.articleId,
        url: this.props.match
    }

    async doLike() {
        // let data = {
        //     "articleId": this.state.articleId,
        // };
        // let res = await doLikeFunc(data);
        // let isLike = res.data.isLike; // 判断点赞or取消点赞
        // let likeNum = isLike ? this.state.likeNum + 1 : (this.state.likeNum - 1 > 0 ? this.state.likeNum - 1 : 0); //点赞or取消点赞后相应改变点赞数量
        // this.setState({
        //     isLike: isLike,
        //     likeNum: likeNum
        // });
    }
 
    componentWillMount(){
        // let params = ("articleId=" + this.props.articleId);
        // let articleRes = await findOneArticleFunc(params);
        // let likeRes = await sumLikeFunc(params);
        // let likeNum = likeRes.data.sumLike; // 点赞总数
        // let isLike = likeRes.data.isLike; // 是否已点赞
        // let data = articleRes.data.allResult[0];
        // // console.log(likeRes);
        // this.setState({
        //     "title": data.title,
        //     "content": data.content,
        //     "likeNum": likeNum,
        //     "isLike": isLike,
        //     "tagType": data.tagId.name,
        //     "writer": data.userId ? data.userId.username : "佚名",
        //     "publishTime": new Date(data.date.createAt).toLocaleString(),
        // });
    }

    componentDidMount(){
        // console.log("this.props");
        // console.log(this.props.location.query);
        let {dispatch,location} = this.props;
        let articleId = location.query.id;
        dispatch(showArticleDetail("articleId="+articleId));
        dispatch(sumArticleLike("articleId="+articleId));
    }

    render(){
        let {articleDetail,articleLike} = this.props;
        let detail = articleDetail ? articleDetail[0] : null;
        let isLike = articleLike ? articleLike.isLike : null;
        let sumLike = articleLike ? articleLike.sumLike : 0;
        let articleId = this.props.location.query.id;
        // console.log("this.props");
        // console.log(this.props);
        // console.log(detail);
        if(detail){
            return (
                <div>
                    <div className="content">
                        <h1>{detail.title}</h1>
                        <h6><a>{detail.tagId.name}</a> | {detail.userId.username} | {detail.date.createAt}</h6>
                        <p dangerouslySetInnerHTML={{__html:detail.content}}></p>
                        <div>
                            <Tooltip title="Like" onClick={this.doLike.bind(this)}>
                                <Icon type="like" theme={isLike ? 'filled' : 'outlined'}/>
                            </Tooltip>
                            <span style={{ paddingLeft: 0, cursor: 'hover' }}>{sumLike}</span>
                        </div>
                    </div>
                    {/* <ShowComment articleId={this.props.articleId}/> */}
                    {/* <AddComment articleId={this.props.articleId} /> */}
                    {/* <CommentList/>
                    <AddComment/> */}
                    <Comments articleId={articleId}/>
                </div>
            );
        }else{
            return (<div></div>);
        }
        
    }
}

const mapStateToProps = state => {
    // console.log("mapStateToProps state")
    // console.log(state)
    return {
        articleDetail: state.article.articleDetail,
        articleLike: state.likes.articleLike,
    }
}

ArticleDetail.PropTypes = {
    // articleList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ArticleDetail);