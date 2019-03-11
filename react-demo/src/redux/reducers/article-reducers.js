import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    UPDATE_ARTICLE,
    SHOW_ARTICLE,
} from "../actions/article-actions";

const initState = {
    article: [
        {
            id: 1,
            name: "vue 001",
            tag: "VUE"
        }
    ] 
}

export default function(state=initState, action){
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
        case SHOW_ARTICLE:
            return{
                ...state,
                article: [...state.article, action.payload]
            }
        default:
            return state === undefined ? [] : state;
    }
}