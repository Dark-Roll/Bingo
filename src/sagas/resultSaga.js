import {
    put,
    takeEvery,
    all
} from 'redux-saga/effects'

import { 
    RECORD_RESULT,
    RECORD_RESULT_SUCCESS,
    RECORD_RESULT_ERROR,
} from '../constants/actionTypes';

function* watchRecordResult() {
    yield takeEvery(RECORD_RESULT, recordResult)
}

function* recordResult(action) {
    try {

        yield put({ type: RECORD_RESULT_SUCCESS, data: action.payload})

    } catch (error) {
        yield put({ type: RECORD_RESULT_ERROR, error })
    }
}


export default function* resultSaga() {
    yield all([
        watchRecordResult()
    ])
}