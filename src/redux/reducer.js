import * as Actions from './actions';

const initialStore = {
    logged: false
}

const reducer = (store = initialStore, action) => {
    switch(action.type){
        case Actions.LOGIN_PENDING:
        return store
        case Actions.LOGIN_SUCCESS:
        return {...store, logged: true, token: action.payload.token, username: action.payload.username}
        case Actions.LOGIN_FAILURE:
        return store
        case Actions.SIGN_UP_SUCCESS:
        return {...store, logged: true, username: action.payload.username}
        case Actions.LOGOUT:
        return {...store, logged: false}
        default:
        return store
    }
}

export default reducer