import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import AddComment from '../addComment/index';
import ShowComment from '../showComment/index';
import { Icon, Tooltip } from 'antd';
require('./article.scss');

class Article extends React.Component{
    state={
        title: "",
        content: "",
        likeNum: 0,
        articleId: this.props.articleId,
        url: this.props.match
    }

    doLike() {
        console.log("like...............")
        let articleId = this.state.articleId;
        axios.post("http://localhost:3000/pointArticle", Qs.stringify({
            "articleId": articleId
        })).then(function(res){
            console.log(res);
        })
    }
 
    componentWillMount(){
        let id = this.props.articleId;
        // console.log(this.props.articleId);
        const _this = this;
        axios.get("http://localhost:3000/findOneArticle?articleId=" + id).then(function (res) {
            // console.log(res);
            let data = res.data.allResult[0];
            _this.setState({
                "title": data.title,
                "content": data.content,
                "likeNum": data.likeNum
            });
        })
    }

    componentDidMount(){
        // console.log(this.props.articleId);
    }

    render(){
        return (
            <div>
                <div className="content">
                    <h1>{this.state.title}</h1>
                    <p dangerouslySetInnerHTML={{__html:this.state.content}}></p>
                    <div>
                        <Tooltip title="Like" onClick={this.doLike.bind(this)}>
                            <Icon type="like" theme={'liked' === 'outlined' ? 'filled' : 'outlined'}/>
                        </Tooltip>
                        <span style={{ paddingLeft: 0, cursor: 'auto' }}>{this.state.likeNum}</span>
                    </div>
                </div>
                {/* <ShowComment articleId={this.props.articleId}/> */}
                <AddComment articleId={this.props.articleId} />
            </div>
        );
    }
}

export default Article;