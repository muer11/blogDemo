import Qs from 'qs';
import server from './server';
import url from './serviceAPI.config';

//get方法
function getMethod(apiUrl, data) {
    return {
        url: data ? (apiUrl+"?"+data) : apiUrl,
        method: 'get',
        dataType: "json",
        // data: null
    }
}
//post方法
function postMethod(apiUrl, data) {
    return {
        url: apiUrl,
        method: 'post',
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: Qs.stringify(data)
    }
}

//user
let isLoginUrl = url.isLoginUrl;
let logoutUrl = url.logoutUrl;
let loginUrl = url.loginUrl;
let registerUrl = url.registerUrl;
let getUsersUrl = url.getUsersUrl;
let deleteUserUrl = url.deleteUserUrl;
export function isLoginFunc(){
    return server(
        getMethod(isLoginUrl)
    )
}
export function logoutFunc() {
    return server(
        getMethod(logoutUrl)
    )
}
export function loginFunc(data) {
    return server(
        postMethod(loginUrl, data)
    )
}
export function registerFunc(data) {
    return server(
        postMethod(registerUrl, data)
    )
}
export function getUsersFunc() {
    return server(
        getMethod(getUsersUrl)
    )
}
export function deleteUserFunc(data) {
    return server(
        postMethod(deleteUserUrl, data)
    )
}

//tag
let showTagsUrl = url.showTagsUrl;
let addTagUrl = url.addTagUrl;
let delTagUrl = url.delTagUrl;
export function showTagsFunc() {
    return server(
        getMethod(showTagsUrl)
    )
}
export function addTagFunc(data) {
    return server(
        postMethod(addTagUrl, data)
    )
}
export function delTagFunc(data) {
    return server(
        postMethod(delTagUrl, data)
    )
}

//article
let doRecordingUrl = url.doRecordingUrl;
let editRecordingUrl = url.editRecordingUrl;
let getArticleUrl = url.getArticleUrl;
let getTagArticleUrl = url.getTagArticleUrl;
let findOneArticleUrl = url.findOneArticleUrl;
let delArticleUrl = url.delArticleUrl;
export function doRecordingFunc(data) {
    return server(
        postMethod(doRecordingUrl, data)
    )
}
export function editRecordingFunc(data) {
    return server(
        postMethod(editRecordingUrl, data)
    )
}
export function getArticleFunc(params) {
    return server(
        getMethod(getArticleUrl, params)
    )
}
export function getTagArticleFunc(params) {
    return server(
        getMethod(getTagArticleUrl, params)
    )
}
export function findOneArticleFunc(data) {
    return server(
        getMethod(findOneArticleUrl, data)
    )
}
export function delArticleFunc(data) {
    return server(
        postMethod(delArticleUrl, data)
    )
}

//comment
let doCommentUrl = url.doCommentUrl;
let getCommentUrl = url.getCommentUrl;
export function doCommentFunc(data) {
    return server(
        postMethod(doCommentUrl, data)
    )
}
export function getCommentFunc(data) {
    return server(
        getMethod(getCommentUrl, data)
    )
}

//like
let doLikeUrl = url.doLikeUrl;
let sumLikeUrl = url.sumLikeUrl;
export function doLikeFunc(data) {
    return server(  
        postMethod(doLikeUrl, data)
    )
}
export function sumLikeFunc(params) {
    return server(
        getMethod(sumLikeUrl, params)
    )
}
