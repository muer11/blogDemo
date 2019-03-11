export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER  = "UPDATE_USER";
export const SHOW_USER  = "SHOW_USER";

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