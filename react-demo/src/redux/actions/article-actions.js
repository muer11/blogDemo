import fetch from "cross-fetch";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const LIST_ARTICLE = "LIST_ARTICLE";

function requestPosts(data) {
    return {
        type: REQUEST_POSTS,
        data
    }
}
function receivePosts(data, json) {
    console.log("receivePosts json");
    console.log(data);
    console.log(json);
    return {
        type: LIST_ARTICLE,
        articleList: json
    }
}

function fetchPosts(data) {
    return dispatch => {
        dispatch(requestPosts(data));
        return fetch("/api/article/getTagArticle?isPublished=true&"+(data?data:null), {
                    method: 'GET',
                })
                .then(response => {
                    return response.json();
                }).then(json=> {
                    // console.log(json);
                    // console.log(json.data.allResult);
                    
                    let articles = json.data;
                    // json.data.allResult.map((val,index)=>{
                        //     articles.push(val);
                        // })
                    console.log("artcile json");
                    console.log(articles)
                    dispatch(receivePosts(data, articles))
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

export function articleFetchPostsIfNeeded(data) {
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
            return dispatch(fetchPosts(data))
        // }
    }
}

export function addArticle(data){
    return {
        type: ADD_ARTICLE,
        payload: {
            
        }
    }
}
export function deleteArticle(data){
    return {
        type: DELETE_ARTICLE,
        payload: {

        }
    }
}
export function updateArticle(data){
    return {
        type: UPDATE_ARTICLE,
        payload: {

        }
    }
}
export function listArticle(data){
    return {
        type: LIST_ARTICLE,
        articles: data
    }
}