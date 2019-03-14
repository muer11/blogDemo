import fetch from "cross-fetch";
import cookie from 'react-cookies'
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER  = "UPDATE_USER";
export const SHOW_USER  = "SHOW_USER";
export const LOGIN_USER = "LOGIN_USER";

function requestPosts(data) {
    return {
        type: REQUEST_POSTS,
        data
    }
}
function receivePosts(json) {
    console.log("receivePosts json");
    // console.log(data);
    console.log(json);
    // cookie.save("token",json.token);
    return {
        type: LOGIN_USER,
        currentUser: json
    }
}

function fetchPosts(url, data) {
    return dispatch => {
        dispatch(requestPosts(data));
        return fetch(url, {
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    return response.json();
                }).then(json=> {
                    console.log(json);
                    // console.log(json.data.allResult);
                    
                    // let articles = json.data;
                    // // json.data.allResult.map((val,index)=>{
                    //     //     articles.push(val);
                    //     // })
                    // console.log("artcile json");
                    // console.log(articles)
                    dispatch(receivePosts(json.data))
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

export function userFetchPostsIfNeeded(url, data) {
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
            return dispatch(fetchPosts(url, data))
        // }
    }
}

export function addUser(data){
    return {
        type: ADD_USER,
        payload: {
            data
        }
    }
}
export function deleteUser(data){
    return {
        type: DELETE_USER,
        payload: {

        }
    }
}
export function updateUser(data){
    return {
        type: UPDATE_USER,
        payload: {

        }
    }
}
export function showUser(data){
    return {
        type: SHOW_USER,
        payload: {

        }
    }
}
export function loginUser(data){
    return {
        type: LOGIN_USER,
        payload: {

        }
    }
}