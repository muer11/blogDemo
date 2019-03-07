import React from 'react';
import AddComment from '../addComment/index';
import ShowComment from '../showComment/index';
import { Icon, Tooltip } from 'antd';
import { findOneArticleFunc, doLikeFunc, sumLikeFunc } from './../../api/api';
require('./article.scss');

class Article extends React.Component{
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
        let data = {
            "articleId": this.state.articleId,
        };
        let res = await doLikeFunc(data);
        let isLike = res.data.isLike; // 判断点赞or取消点赞
        let likeNum = isLike ? this.state.likeNum + 1 : (this.state.likeNum - 1 > 0 ? this.state.likeNum - 1 : 0); //点赞or取消点赞后相应改变点赞数量
        this.setState({
            isLike: isLike,
            likeNum: likeNum
        });
    }
 
    async componentWillMount(){
        let params = ("articleId=" + this.props.articleId);
        let articleRes = await findOneArticleFunc(params);
        let likeRes = await sumLikeFunc(params);
        let likeNum = likeRes.data.sumLike; // 点赞总数
        let isLike = likeRes.data.isLike; // 是否已点赞
        let data = articleRes.data.allResult[0];
        // console.log(likeRes);
        this.setState({
            "title": data.title,
            "content": data.content,
            "likeNum": likeNum,
            "isLike": isLike,
            "tagType": data.tagId.name,
            "writer": data.userId ? data.userId.username : "佚名",
            "publishTime": new Date(data.date.createAt).toLocaleString(),
        });
    }

    componentDidMount(){
        // console.log(this.props.articleId);
    }

    render(){
        return (
            <div>
                <div className="content">
                    <h1>{this.state.title}</h1>
                    <h6><a>{this.state.tagType}</a> | {this.state.writer} | {this.state.publishTime}</h6>
                    <p dangerouslySetInnerHTML={{__html:this.state.content}}></p>
                    <div>
                        <Tooltip title="Like" onClick={this.doLike.bind(this)}>
                            <Icon type="like" theme={this.state.isLike ? 'filled' : 'outlined'}/>
                        </Tooltip>
                        <span style={{ paddingLeft: 0, cursor: 'hover' }}>{this.state.likeNum}</span>
                    </div>
                </div>
                {/* <ShowComment articleId={this.props.articleId}/> */}
                <AddComment articleId={this.props.articleId} />
            </div>
        );
    }
}

export default Article;