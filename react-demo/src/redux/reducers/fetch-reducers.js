// import {
//     REQUEST_POSTS,
//     RECEIVE_POSTS
// } from "../actions/fetch-actions";

// export default function (state, action) {
//     console.log("reducer action")
//     console.log(action)
//     console.log(state)
//     switch (action.type) {
//         case REQUEST_POSTS:
//             return {
//                 ...state,
//                 tags: action.tags
//             }
//         case RECEIVE_POSTS:
//             return {
//                 ...state,
//                 tags: action.tags
//             }
//         default:
//             return state === undefined ? [] : state;
//     }
// }
