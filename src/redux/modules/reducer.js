import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import bookings from './bookings';

export default combineReducers({
    router: routerStateReducer,
    auth,
    form,
    bookings,
    multireducer: multireducer({
        counter1: counter,
        counter2: counter,
        counter3: counter
    }),
    info
});
