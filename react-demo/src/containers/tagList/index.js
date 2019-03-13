import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {listTag} from "../../redux/actions/tag-actions";
import {fetchPostsIfNeeded} from "../../redux/actions/fetch-actions";
import { showTagsFunc } from './../../api/api';
import Tab from "../../components/tab";


class TagList extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {dispatch, tags} = this.props;
        dispatch(fetchPostsIfNeeded(tags));
    }

    render(){
        const {tags} = this.props;
        // console.log("render tags");
        // console.log(tags.tags);
        return tags.tags ? (<div>{<Tab tags = {tags.tags}/>}</div>) : null
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
        tags: state.tags
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
TagList.PropTypes = {
    tags: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(TagList);

