import {
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    LIST_COMMENT,
    SHOW_COMMENT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from "../actions/comment-actions";

// const initState = {
//     comment: [
//         {
//             id: 1,
//             name: "vue 001",
//             tag: "VUE"
//         }
//     ] 
// }

export default function(state, action){
    switch(action.type){
        case ADD_COMMENT:
            console.log("ADD_COMMENT");
            // console.log(action.commentList);
            // console.log(state);
            // let commentList = state.comment.commentList ? state.comment.commentList : null
            // commentList.push(action.commentList);
            // console.log(commentList);
            return{
                ...state,
                commentList:[...state.commentList, ...action.commentList]
            }
        case DELETE_COMMENT:
            return{
                ...state,
                comment: state.comment.filter(item=> item.id !== action.payload.id)
            }
        case UPDATE_COMMENT:
            return{
                ...state,
                comment: state.comment.map(item=>item.id === action.payload.id ? action.payload : item)
            }
        case LIST_COMMENT:
            // console.log("comment action");
            // console.log(action);
            // console.log(action.commentList);
            return{
                ...state,
                commentList: action.commentList
            }
        case SHOW_COMMENT:
            // console.log("comment action");
            // console.log(action);
            // console.log(action.commentDetail);
            return{
                ...state,
                commentDetail: action.commentDetail
            }
        default:
            return state === undefined ? [] : state;
    }
}