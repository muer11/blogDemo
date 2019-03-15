import fetch from "cross-fetch";
import cookie from 'react-cookies';
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER  = "UPDATE_USER";
export const SHOW_USER  = "SHOW_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

function requestPosts(data) {
    return {
        type: REQUEST_POSTS,
        data
    }
}
function receivePosts(type, ...argNames) {
    return function (...args) {
        let action = {
            type
        }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        console.log("receivePosts action");
        console.log(action);
        return action
    }
}

function fetchPosts(args) {
    return dispatch => {
        dispatch(requestPosts(args.data));
        switch (args.method) {
            case "GET":
                return fetch(args.url + "?" + args.data)
                    .then(response => {
                        return response.json();
                    }).then(json => {
                        dispatch(receivePosts(args.type, args.name)(json.data))
                    }).catch((err) => {
                        console.log(err);
                    });
            case "POST":
                return fetch(args.url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(args.data)
                    })
                    .then(response => {
                        return response.json();
                    }).then(json => {
                        args.name ? dispatch(receivePosts(args.type, args.name)(json.data)) : dispatch(receivePosts(args.type)())           
                    }).catch((err) => {
                        console.log(err);
                    });
            default: 
                return;
        }      
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

//登录
export function loginUser(data) {
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
        return dispatch(fetchPosts({
            method:"POST", 
            url:"/api/user/doLogin", 
            data,
            type: LOGIN_USER,
            name: "currentUser"
        }))
        // }
    }
}
//退出登录
export function logoutUser(data) {
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
        return dispatch(fetchPosts({
            method:"GET", 
            url: "/api/user/logout",
            data,
            type: LOGOUT_USER,
            name: "currentUser"
        }))
        // }
    }
}

//用户注册
export function addUser(data){
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
        return dispatch(fetchPosts({
            method: "POST",
            url: "/api/user/doRegister",
            data,
            type: ADD_USER,
            name: null
        }))
        // }
    }
}

//删除用户
export function deleteUser(data){
    return {
        type: DELETE_USER,
        payload: {

        }
    }
}

//更新用户
export function updateUser(data){
    return {
        type: UPDATE_USER,
        payload: {

        }
    }
}

//用户详情
export function showUser(data){
    return {
        type: SHOW_USER,
        payload: {

        }
    }
}
