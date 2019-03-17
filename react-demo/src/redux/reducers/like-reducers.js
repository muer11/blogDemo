import {
    ADD_LIKE,
    DELETE_LIKE,
    UPDATE_LIKE,
    SUM_ARTICLE_LIKE,
} from "../actions/like-actions";

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
        case ADD_LIKE:
            return{
                ...state,
                article:[...state.article, action.payload]
            }
        case DELETE_LIKE:
            return{
                ...state,
                article: state.article.filter(item=> item.id !== action.payload.id)
            }
        case UPDATE_LIKE:
            return{
                ...state,
                article: state.article.map(item=>item.id === action.payload.id ? action.payload : item)
            }
        case SUM_ARTICLE_LIKE:
            // console.log("article action");
            // console.log(action);
            // console.log(action.articleLike);
            return{
                ...state,
                articleLike: action.articleLike
            }
        default:
            return state === undefined ? [] : state;
    }
}