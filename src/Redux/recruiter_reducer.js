const initialState = {
    recruiter: {
        name: ''
    }
}

const GET_RECRUITER = 'GET_RECRUITER',
      CLEAR_RECRUITER = 'CLEAR_RECRUITER';

export function getRecruiter(recruiterObj){
    return {
        type: GET_RECRUITER,
        payload: recruiterObj
    }
}

export function clearRecruiter(){
    return {
        type: CLEAR_RECRUITER,
        payload: {}
    }
}


export default function reducer(state = initialState,action){
    const {type, payload} = action;

    switch(type){
        case GET_RECRUITER:
            return {...state, recruiter: payload};
        case CLEAR_RECRUITER:
            return {...state, recruiter: payload};
        default:
            return state;
    }
}