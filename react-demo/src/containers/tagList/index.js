import {connect} from "react-redux";
import {listTag} from "../../redux/actions/tag-actions";
import { showTagsFunc } from './../../api/api';
import Tab from "../../components/tab";

let showTags = async () => {
    let res = await showTagsFunc();
    let data = res.data;
}

const getTags = (tags, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return tags.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return tags.filter(t => !t.completed)
        case 'SHOW_ALL':
        default:
            return tags
    }
}

const mapStateToProps = state => {
    
    return {
        tags: getTags(state.tags, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const TagList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tab);

export default TagList;

