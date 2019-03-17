import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
// import {listArticle} from "../../redux/actions/article-actions";
import {listArticle} from "../../redux/actions/article-actions";
import Lists from "../../components/list";

class ArticleList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {dispatch, articleList} = this.props;
        // console.log("componentDidMount article");
        // console.log(articleList); //undefined;
        // dispatch(articleFetchPostsIfNeeded());
    }

    render(){
        const {articleList} = this.props;
        // console.log("render articles");
        // console.log(articleList);
        return  articleList ? (<div>{<Lists articleList = {articleList}/>}</div>) : null
    }

}


// const getTags = (tags, filter) => {
//     switch (filter) {
//         case 'SHOW_COMPLETED':
//             return tags.filter(t => t.completed)
//         case 'SHOW_ACTIVE':
//             return tags.filter(t => !t.completed)
//         case 'SHOW_ALL':
//         default:
//             return tags
//     }
// }

const mapStateToProps = state => {
    console.log("mapStateToProps state")
    console.log(state)
    return {
        articleList: state.article.articleList
    }
}

// const mapDispatchToProps = dispatch => {  
//     return {
//         onClick : id =>{
//             dispatch(listTag(id))
//         } 
//     }
// }

// const TagList = connect(
    // mapStateToProps,
    // mapDispatchToProps
// )(Tab);
ArticleList.PropTypes = {
    articleList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ArticleList);