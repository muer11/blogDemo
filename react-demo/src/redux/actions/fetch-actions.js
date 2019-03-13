import fetch from "cross-fetch";
export const REQUEST_POSTS = "REQUEST_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
// export const SELECT_TAG = "SELECT_TAG"
// export const INVALIDATE_TAG = "INVALIDATE_TAG"

function requestPosts(data) {
    return {
        type: REQUEST_POSTS,
        data
    }
}
function receivePosts(data,json) {
    console.log("receivePosts json");
    console.log(data);
    console.log(json);
    return {
        type: RECEIVE_POSTS,
        tags: json
    }
}

function fetchPosts(data) {
    return dispatch => {
        dispatch(requestPosts(data));
        return fetch("/api/tag/showTags", {
                    method: 'GET',
                })
                .then(response => {
                    return response.json();
                }).then(json=> {
                    console.log("json");
                    console.log(json);
                    console.log(data);
                    dispatch(receivePosts(data, json.data.allTags))
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

export function fetchPostsIfNeeded(data) {
    return (dispatch, getState) => {
        // if(shouldFetchPosts(getState(), data)){
            return dispatch(fetchPosts(data))
        // }
    }
}