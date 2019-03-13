import { combineReducers } from "redux";
import articleReducer from "./reducers/article-reducers";
import commentReducer from "./reducers/comment-reducers";
import likeReducer from "./reducers/like-reducers";
import tagReducer from "./reducers/tag-reducers";
import userReducer from "./reducers/user-reducers";
import fetchReducer from "./reducers/fetch-reducers";

const allReducers = {
    article: articleReducer,
    comments: commentReducer,
    likes: likeReducer,
    tags: tagReducer,
    user: userReducer,
    fetch: fetchReducer,
}
const rootReducer = combineReducers(allReducers);

export default rootReducer;



// import {combineReducers} from 'redux';

// function reducer(state=0, action){
//     return state;
// }

// export default combineReducers({reducer});