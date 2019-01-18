import React from 'react';
import axios from 'axios';
import AddComment from '../addComment/index';
import ShowComment from '../showComment/index';
require('./article.scss');

class Article extends React.Component{
    state={
        title: "",
        content: "",
        url: this.props.match
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
                "content": data.content
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
                </div>
                {/* <ShowComment articleId={this.props.articleId}/> */}
                <AddComment articleId={this.props.articleId} />
            </div>
        );
    }
}

export default Article;