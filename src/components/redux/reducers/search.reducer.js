import {
	SEARCH_VIDEO_FAIL,
	SEARCH_VIDEO_REQUEST,
	SEARCH_VIDEO_SUCCESS,
} from "../actionType";

export const SearchVideosReducer = (
	state = {
		loading: true,
		videos: [],
	},
	action
) => {
	switch (action.type) {
		case SEARCH_VIDEO_REQUEST:
			return { ...state, loading: true };

		case SEARCH_VIDEO_SUCCESS:
			return {
				...state,
				videos: action.payload,
				loading: false,
			};
		case SEARCH_VIDEO_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
