import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    UPDATE_ARTICLE,
    LIST_ARTICLE,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from "../actions/article-actions";

// const initState = {
//     article: [
//         {
//             id: 1,
//             name: "vue 001",
//             tag: "VUE"
//         }
//     ] 
// }

export default function(state, action){
    switch(action.type){
        case ADD_ARTICLE:
            return{
                ...state,
                article:[...state.article, action.payload]
            }
        case DELETE_ARTICLE:
            return{
                ...state,
                article: state.article.filter(item=> item.id !== action.payload.id)
            }
        case UPDATE_ARTICLE:
            return{
                ...state,
                article: state.article.map(item=>item.id === action.payload.id ? action.payload : item)
            }
        case LIST_ARTICLE:
            console.log("article action");
            console.log(action);
            console.log(action.articleList);
            return{
                ...state,
                articleList: action.articleList
            }
        default:
            return state === undefined ? [] : state;
    }
}