import {fetchPosts} from "./fetch-actions";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT  = "UPDATE_COMMENT";
export const LIST_COMMENT  = "LIST_COMMENT";
export const SHOW_COMMENT  = "SHOW_COMMENT";

export function addComment(data){
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
        return dispatch(fetchPosts({
            method: "POST", 
            url: "/api/comment/doComment", 
            data: data,
            type: ADD_COMMENT,
            name: "commentList"
        }))
        // }
    }
}
export function deleteComment(data){
    return {
        type: DELETE_COMMENT,
        payload: {

        }
    }
}
export function updateComment(data){
    return {
        type: UPDATE_COMMENT,
        payload: {

        }
    }
}
//文章详情中的评论
export function showComments(data){
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
        return dispatch(fetchPosts({
            method:"GET", 
            url:"/api/comment/getComment", 
            data:(data?data:""),
            type: LIST_COMMENT,
            name: "commentList"
        }))
        // }
    }
}