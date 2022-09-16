import request from "../../../api";
import {
	CHANNEL_DETAILS_FAIL,
	CHANNEL_DETAILS_REQUEST,
	CHANNEL_DETAILS_SUCCESS,
	SET_SUBSCRIPTION_STATUS,
} from "../actionType";

export const getChannelDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: CHANNEL_DETAILS_REQUEST,
		});

		const res = await request.get("/channels", {
			params: {
				part: "snippet,statistics,contentDetails",
				id: id,
			},
		});

		dispatch({
			type: CHANNEL_DETAILS_SUCCESS,
			payload: res.data.items[0],
		});
	} catch (err) {
		console.log(err.response.data);
		dispatch({
			type: CHANNEL_DETAILS_FAIL,
			payload: err.response.data,
		});
	}
};

export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
	try {
		const res = await request.get("/subscriptions", {
			params: {
				part: "snippet",
				forChannelId: id,
				mine: true,
			},
			headers: {
				Authorization: `Bearer ${getState().auth.accessToken}`,
			},
		});

		dispatch({
			type: SET_SUBSCRIPTION_STATUS,
			payload: res.data.items.length !== 0,
		});
	} catch (err) {
		console.log(err);
	}
};
