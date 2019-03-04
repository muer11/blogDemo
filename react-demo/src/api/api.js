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
        data: data
    }
}
//user
let isLoginUrl = url.isLoginUrl;
let logoutUrl = url.logoutUrl;
let loginUrl = url.loginUrl;
let registerUrl = url.registerUrl;
//user
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

//tag
let showTagsUrl = url.showTagsUrl;
let addTagUrl = url.addTagUrl;
let delTagUrl = url.delTagUrl;
//tag
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
let pointArticleUrl = url.pointArticleUrl;
//article
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
export function getArticleFunc() {
    return server(
        getMethod(getArticleUrl)
    )
}
export function getTagArticleFunc() {
    return server(
        getMethod(getTagArticleUrl)
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
export function pointArticleFunc(data) {
    return server(  
        postMethod(pointArticleUrl, data)
    )
}
  
//comment
let doCommentUrl = url.doCommentUrl;
let pointCommentUrl = url.pointCommentUrl;
let getCommentUrl = url.getCommentUrl;
export function doCommentFunc(data) {
    return server(
        postMethod(doCommentUrl, data)
    )
}
export function pointCommentFunc(data) {
    return server(
        postMethod(pointCommentUrl, data)
    )
}
export function getCommentFunc(data) {
    return server(
        getMethod(getCommentUrl, data)
    )
}
