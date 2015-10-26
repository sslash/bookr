const LOAD = 'bookr/bookings/LOAD';
const LOAD_SUCCESS = 'bookr/bookings/LOAD_SUCCESS';
const LOAD_FAIL = 'bookr/bookings/LOAD_FAIL';
const EDIT_START = 'bookr/bookings/EDIT_START';
const EDIT_STOP = 'bookr/bookings/EDIT_STOP';
const SAVE = 'bookr/bookings/SAVE';
const SAVE_SUCCESS = 'bookr/bookings/SAVE_SUCCESS';
const SAVE_FAIL = 'bookr/bookings/SAVE_FAIL';

const initialState = {
    loaded: false,
    editing: {},
    saveError: {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
        return {
            ...state,
            loading: true
        };
        case LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result,
            error: null
        };
        case LOAD_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false,
            data: null,
            error: action.error
        };
        case EDIT_START:
        return {
            ...state,
            editing: {
                ...state.editing,
                [action.id]: true
            }
        };
        case EDIT_STOP:
        return {
            ...state,
            editing: {
                ...state.editing,
                [action.id]: false
            }
        };
        case SAVE:
        return state; // 'saving' flag handled by redux-form
        case SAVE_SUCCESS:
        const data = [...state.data];
        data[action.result.id - 1] = action.result;
        return {
            ...state,
            data: data,
            editing: {
                ...state.editing,
                [action.id]: false
            },
            saveError: {
                ...state.saveError,
                [action.id]: null
            }
        };
        case SAVE_FAIL:
        return typeof action.error === 'string' ? {
            ...state,
            saveError: {
                ...state.saveError,
                [action.id]: action.error
            }
        } : state;
        default:
        return state;
    }
}

export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.get('/booking/load') // params not used, just shown as demonstration
    };
}

export function save(booking) {
    return {
        types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
        id: booking.id,
        promise: (client) => client.post('/booking/create', {
            data: booking
        })
    };
}

export function editStart(id) {
    return { type: EDIT_START, id };
}

export function editStop(id) {
    return { type: EDIT_STOP, id };
}
