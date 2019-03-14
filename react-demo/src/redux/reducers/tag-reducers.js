import {
    ADD_TAG,
    DELETE_TAG,
    UPDATE_TAG,
    LIST_TAG,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from "../actions/tag-actions";
// import {
//     REQUEST_POSTS,
//     RECEIVE_POSTS
// } from "../actions/fetch-actions";

// const initState = {
//     tags: [{
//         id: 1,
//         name: "muer",
//     }]
// }

export default function (state, action) {
    switch (action.type) {
        case ADD_TAG:
            return {
                ...state,
                tag: [...state.tag, action.payload]
            }
        case DELETE_TAG:
            return {
                ...state,
                tag: state.tag.filter(item => item.id !== action.payload.id)
            }
        case UPDATE_TAG:
            return {
                ...state,
                tag: state.tag.map(item => item.id === action.payload.id ? action.payload : item)
            }
        case LIST_TAG:
            // console.log("action.listTags");
            // console.log(action.listTags);
            return {
                ...state,
                tags: [...state.tags, action.listTags]
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                tags: action.tags
            }
        default:
            return state === undefined ? [] : state;
    }
}