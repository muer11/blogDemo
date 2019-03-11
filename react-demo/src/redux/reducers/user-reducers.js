import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    SHOW_USER,
} from "../actions/user-actions";

const initState = {
    user: [
        {
            id: 1,
            name: "muer",
        }
    ] 
}

export default function(state=initState, action){
    switch(action.type){
        case ADD_USER:
            return{
                ...state,
                user:[...state.user, action.payload]
            }
        case DELETE_USER:
            return{
                ...state,
                user: state.user.filter(item=> item.id !== action.payload.id)
            }
        case UPDATE_USER:
            return{
                ...state,
                user: state.user.map(item=>item.id === action.payload.id ? action.payload : item)
            }
        case SHOW_USER:
            return{
                ...state,
                user:[...state.user, action.payload]
            }
        default:
            return state === undefined ? [] : state;
    }
}