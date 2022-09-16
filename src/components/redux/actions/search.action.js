import request from "../../../api";
import {
	SEARCH_VIDEO_FAIL,
	SEARCH_VIDEO_REQUEST,
	SEARCH_VIDEO_SUCCESS,
} from "../actionType";

export const getVideosBySearch = (keyword) => async (dispatch) => {
	try {
		dispatch({
			type: SEARCH_VIDEO_REQUEST,
		});

		const res = await request.get("/search", {
			params: {
				part: "snippet",
				maxResults: 20,
				q: keyword,
				type: "video,channel",
			},
		});

		dispatch({
			type: SEARCH_VIDEO_SUCCESS,
			payload: res.data.items,
		});
	} catch (err) {
		console.log(err.message);
		dispatch({
			type: SEARCH_VIDEO_FAIL,
			payload: err.message,
		});
	}
};
