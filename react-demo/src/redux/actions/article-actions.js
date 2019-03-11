export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const SHOW_ARTICLE = "SHOW_ARTICLE";

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
export function showArticle(data){
    return {
        type: SHOW_ARTICLE,
        payload: {

        }
    }
}