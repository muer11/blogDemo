import {fetchPosts} from "./fetch-actions";
export const ADD_LIKE = "ADD_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";
export const UPDATE_LIKE  = "UPDATE_LIKE";
export const SUM_ARTICLE_LIKE = "SUM_ARTICLE_LIKE";

export function addLike(data){
    return {
        type: ADD_LIKE,
        payload: {
            
        }
    }
}
export function deleteLike(data){
    return {
        type: DELETE_LIKE,
        payload: {

        }
    }
}
export function updateLike(data){
    return {
        type: UPDATE_LIKE,
        payload: {

        }
    }
}
//文章点赞量
export function sumArticleLike(data){
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
        return dispatch(fetchPosts({
            method:"GET", 
            url:"/api/like/sumLike", 
            data:"isPublished=true"+(data?("&"+data):""),
            type: SUM_ARTICLE_LIKE,
            name: "articleLike"
        }))
        // }
    }
}