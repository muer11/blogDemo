import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {listTag} from "../../redux/actions/tag-actions";
import {fetchPostsIfNeeded} from "../../redux/actions/tag-actions";
import {articleFetchPostsIfNeeded} from "../../redux/actions/article-actions";
import { showTagsFunc } from './../../api/api';
import Tab from "../../components/tab";

class TagList extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {tags,dispatch} = this.props;
        // console.log("this.props");
        // console.log(this.props);
        dispatch(fetchPostsIfNeeded(tags));
        dispatch(articleFetchPostsIfNeeded());
    }

    listTagArticles = (key)=>{
        // console.log("listTagArticles func");
        // console.log(this.props);
        // console.log(key);
        const {tags,dispatch} = this.props;
        dispatch(articleFetchPostsIfNeeded("tagId="+key));
    }

    render(){
        const {tags,listTagArticles} = this.props;
        // console.log("render tags");
        // console.log(tags.tags);
        return tags ? (<div>{<Tab tags = {tags} listTagArticles={this.listTagArticles} />}</div>) : null
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
    // console.log("mapStateToProps state")
    // console.log(state)
    return {
        tags: state.tags.tags
    }
}

// const mapDispatchToProps = dispatch => {  
//     return {
//         listTagArticles: (n) => {
//             console.log("mapDispatchToProps")
//             console.log(n)
//             // dispatch(listTag(n))
//             dispatch(fetchPostsIfNeeded(this.props.tags));
//         } 
//     }
// }

// const TagList = connect(
    // mapStateToProps,
    // mapDispatchToProps
// )(Tab);
TagList.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    // listTagArticles: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(TagList);

