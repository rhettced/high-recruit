

const initialState = {
    player: {
        name: ''
    },
    // stats:{
    //     avg_aces: ''
    // }
}

const GET_USER = 'GET_USER',
      CLEAR_USER = 'CLEAR_USER',
      GET_STATS = 'GET_STATS';

export function getStatsRedux(statsObj){
    return{
        type: GET_STATS,
        payload: statsObj
    }
}

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
            return {...state, player: payload, stats: payload};
        case GET_STATS:
            return{...state, stats: payload}
        default:
            return state;
    }
}