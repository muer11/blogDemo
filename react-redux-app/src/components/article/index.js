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
        let href = window.location.href.split("?")[1].split("&");
        let id;
        const _this = this;
        href.map(function(value, index){
            if (value.split("=")[0] == "articleId") {
                id = value.split("=")[1];
            }
        });
        axios.get("http://localhost:3000/findOneArticle?articleId=" + id).then(function (res) {
            console.log(res);
            let data = res.data.allResult[0];
            _this.setState({
                "title": data.title,
                "content": data.content
            });
        })
    }

    componentDidMount(){
        // const id = this.props.match;
        // console.log(id);
    }

    render(){
        return (
            <div>
                <div className="content">
                    <h1>{this.state.title}</h1>
                    <p dangerouslySetInnerHTML={{__html:this.state.content}}></p>
                </div>
                <ShowComment />
                <AddComment />
            </div>
        );
    }
}

export default Article;