/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'

const initialState = {
    payload: {}
}
export default function (state=initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, payload: action.payload};
            break;
        case REGISTER_USER:
            return {...state, payload: action.payload};
            break;
        case AUTH_USER:
            return {...state, payload: action.payload};
            break;
        default:
            return state
            break;
    }
}