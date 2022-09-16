import {
	CHANNEL_DETAILS_REQUEST,
	CHANNEL_DETAILS_FAIL,
	CHANNEL_DETAILS_SUCCESS,
	SET_SUBSCRIPTION_STATUS,
} from "./../actionType";

export const channelDetailsReducer = (
	state = {
		loading: true,
		channel: null,
		subscriptionStatus: false,
	},
	action
) => {
	switch (action.type) {
		case CHANNEL_DETAILS_REQUEST:
			return { ...state, loading: true };

		case CHANNEL_DETAILS_SUCCESS:
			return {
				...state,
				channel: action.payload,
				loading: false,
			};
		case CHANNEL_DETAILS_FAIL:
			return {
				...state,
				channel: null,
				loading: false,
				error: action.payload,
			};
		case SET_SUBSCRIPTION_STATUS:
			return {
				...state,
				subscriptionStatus: action.payload,
			};
		default:
			return state;
	}
};
