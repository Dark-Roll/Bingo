import { bindActionCreators } from 'redux';
import store from '../store';

import {
    RECORD_RESULT,
} from '../constants/actionTypes';

const recordResult = payload => {
    return{
        type: RECORD_RESULT,
        payload
    }
}

export const boundRecordResult = bindActionCreators(recordResult, store.dispatch)

