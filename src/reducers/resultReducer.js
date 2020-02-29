const initialState = {
    result:{win: 0, lose:0},
    message: '',
};

export default function resultReducer(state = initialState, action) {
	switch (action.type) {
		case 'RECORD_RESULT_SUCCESS': {
			return {
                ...state,
				result: action.data
            }
		}
		case 'RECORD_RESULT_ERROR':{
			return {
                ...state,
				error: action.error
			}
		}
		default:
			return state
	}
}