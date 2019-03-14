import fetch from "cross-fetch";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_TAG = "ADD_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const UPDATE_TAG  = "UPDATE_TAG";
export const LIST_TAG = "LIST_TAG";

function requestPosts(data) {
    return {
        type: REQUEST_POSTS,
        data
    }
}
function receivePosts(data,json) {
    // console.log("receivePosts json");
    // console.log(data);
    // console.log(json);
    return {
        type: RECEIVE_POSTS,
        tags: json
    }
}

function fetchPosts(data) {
    return dispatch => {
        dispatch(requestPosts(data));
        return fetch("/api/tag/showTags", {
                    method: 'GET',
                })
                .then(response => {
                    return response.json();
                }).then(json=> {
                    // console.log("json");
                    // console.log(json);
                    // console.log(data);
                    dispatch(receivePosts(data, json.data.allTags))
                })
                // .then(json => dispatch(receivePosts(data, json)))
    }
}

function shouldFetchPosts(state, data){
    const posts = state;
    console.log(data);
    if(!posts){
        return true;
    }else if(posts.isFetching){
        return false;
    }else{
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(data) {
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
            return dispatch(fetchPosts(data))
        // }
    }
}

export function addTag(data){
    return {
        type: ADD_TAG,
        tags: data,
        // payload: {
        // }
    }
}
export function deleteTag(data){
    return {
        type: DELETE_TAG,
        payload: {

        }
    }
}
export function updateTag(data){
    return {
        type: UPDATE_TAG,
        payload: {

        }
    }
}
export function listTag(data){
    // console.log("action.listTags");
    // console.log(data);
    return {
        type: LIST_TAG,
        tags: data
        // payload: {

        // }
    }
}