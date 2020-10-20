const initialState = {
    player: {
        name: ''
    }
}

const GET_USER = 'GET_USER',
      CLEAR_USER = 'CLEAR_USER';

export function getUser(playerObj){
    return {
        type: GET_USER,
        payload: playerObj
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER,
        payload: {}
    }
}


export default function reducer(state = initialState,action){
    const {type, payload} = action;

    switch(type){
        case GET_USER:
            return {...state, player: payload};
        case CLEAR_USER:
            return {...state, player: payload};
        default:
            return state;
    }
}