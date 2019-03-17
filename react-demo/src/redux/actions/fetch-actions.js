import fetch from "cross-fetch";
export const REQUEST_POSTS = "REQUEST_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
// export const SELECT_TAG = "SELECT_TAG"
// export const INVALIDATE_TAG = "INVALIDATE_TAG"
// export const REQUEST_POSTS = "REQUEST_POSTS";
// export const RECEIVE_POSTS = "RECEIVE_POSTS";
// export const ADD_USER = "ADD_USER";
// export const DELETE_USER = "DELETE_USER";
// export const UPDATE_USER  = "UPDATE_USER";
// export const SHOW_USER  = "SHOW_USER";
// export const LOGIN_USER = "LOGIN_USER";
// export const LOGOUT_USER = "LOGOUT_USER";

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
        // console.log("receivePosts action");
        // console.log(action);
        return action
    }
}

export function fetchPosts(args) {
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
    // console.log(data);
    if(!posts){
        return true;
    }else if(posts.isFetching){
        return false;
    }else{
        return posts.didInvalidate
    }
}

// export function fetchPostsIfNeeded(data) {
//     return (dispatch, getState) => {
//         // if(shouldFetchPosts(getState(), data)){
//             return dispatch(fetchPosts(data))
//         // }
//     }
// }