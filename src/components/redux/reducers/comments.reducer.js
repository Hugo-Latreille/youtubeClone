import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST } from "../actionType";
import { COMMENT_LIST_SUCCESS } from "./../actionType";

export const commentsReducer = (
	state = {
		loading: true,
		comments: null,
	},
	action
) => {
	switch (action.type) {
		case COMMENT_LIST_REQUEST:
			return { ...state, loading: true };

		case COMMENT_LIST_SUCCESS:
			return {
				...state,
				comments: action.payload,
				loading: false,
			};
		case COMMENT_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
