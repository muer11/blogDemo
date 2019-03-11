export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT  = "UPDATE_COMMENT";

export function addComment(data){
    return {
        type: ADD_COMMENT,
        payload: {
            
        }
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