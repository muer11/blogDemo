export const ADD_TAG = "ADD_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const UPDATE_TAG  = "UPDATE_TAG";
export const LIST_TAG = "LIST_TAG";

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
    return {
        type: LIST_TAG,
        payload: {

        }
    }
}