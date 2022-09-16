import {
	HOME_VIDEOS_FAIL,
	HOME_VIDEOS_REQUEST,
	HOME_VIDEOS_SUCCESS,
	RELATED_VIDEO_FAIL,
	RELATED_VIDEO_REQUEST,
	RELATED_VIDEO_SUCCESS,
	CHANNEL_DETAILS_FAIL,
	CHANNEL_VIDEOS_REQUEST,
	CHANNEL_VIDEOS_SUCCESS,
} from "../actionType";
import request from "../../../api";
import {
	SELECTED_VIDEO_SUCCESS,
	SELECTED_VIDEO_REQUEST,
	SELECTED_VIDEO_FAIL,
	SUBSCRIPTIONS_CHANNEL_FAIL,
	SUBSCRIPTIONS_CHANNEL_REQUEST,
	SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from "./../actionType";

export const getPopularVideos = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: HOME_VIDEOS_REQUEST,
		});

		const res = await request.get("/videos", {
			params: {
				part: "snippet, contentDetails, statistics",
				chart: "mostPopular",
				regionCode: "US",
				maxResults: 20,
				pageToken: getState().homeVideos.nextPageToken,
			},
		});

		dispatch({
			type: HOME_VIDEOS_SUCCESS,
			payload: {
				videos: res.data.items,
				nextPageToken: res.data.nextPageToken,
				category: "All",
			},
		});
	} catch (err) {
		console.log(err.message);
		dispatch({
			type: HOME_VIDEOS_FAIL,
			payload: err.message,
		});
	}
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
	try {
		dispatch({
			type: HOME_VIDEOS_REQUEST,
		});

		const res = await request.get("/search", {
			params: {
				part: "snippet",
				maxResults: 20,
				pageToken: getState().homeVideos.nextPageToken,
				q: keyword,
				type: "video",
			},
		});

		dispatch({
			type: HOME_VIDEOS_SUCCESS,
			payload: {
				videos: res.data.items,
				nextPageToken: res.data.nextPageToken,
				category: keyword,
			},
		});
	} catch (err) {
		console.log(err.message);
		dispatch({
			type: HOME_VIDEOS_FAIL,
			payload: err.message,
		});
	}
};

export const getVideoById = (id) => async (dispatch) => {
	try {
		dispatch({
			type: SELECTED_VIDEO_REQUEST,
		});

		const res = await request.get("/videos", {
			params: {
				part: "snippet, statistics",
				id: id,
			},
		});

		dispatch({
			type: SELECTED_VIDEO_SUCCESS,
			payload: res.data.items[0],
		});
	} catch (err) {
		console.log(err.message);
		dispatch({
			type: SELECTED_VIDEO_FAIL,
			payload: err.message,
		});
	}
};

export const getRelatedVideos = (id) => async (dispatch) => {
	try {
		dispatch({
			type: RELATED_VIDEO_REQUEST,
		});

		const res = await request.get("/search", {
			params: {
				part: "snippet",
				relatedToVideoId: id,
				maxResults: 15,
				type: "video",
			},
		});

		dispatch({
			type: RELATED_VIDEO_SUCCESS,
			payload: res.data.items,
		});
	} catch (err) {
		console.log(err.response.data.message);
		dispatch({
			type: RELATED_VIDEO_FAIL,
			payload: err.response.data.message,
		});
	}
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SUBSCRIPTIONS_CHANNEL_REQUEST,
		});
		const { data } = await request("/subscriptions", {
			params: {
				part: "snippet,contentDetails",
				mine: true,
			},
			headers: {
				Authorization: `Bearer ${getState().auth.accessToken}`,
			},
		});
		dispatch({
			type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
			payload: data.items,
		});
	} catch (error) {
		console.log(error.response.data);
		dispatch({
			type: SUBSCRIPTIONS_CHANNEL_FAIL,
			payload: error.response.data,
		});
	}
};

export const getVideosByChannel = (id) => async (dispatch) => {
	try {
		dispatch({
			type: CHANNEL_VIDEOS_REQUEST,
		});

		// 1. get upload playlist id
		const {
			data: { items },
		} = await request("/channels", {
			params: {
				part: "contentDetails",
				id: id,
			},
		});
		const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
		// 2. get the videos using the id
		const { data } = await request("/playlistItems", {
			params: {
				part: "snippet,contentDetails",
				playlistId: uploadPlaylistId,
				maxResults: 30,
			},
		});

		dispatch({
			type: CHANNEL_VIDEOS_SUCCESS,
			payload: data.items,
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: CHANNEL_DETAILS_FAIL,
			payload: error.response.data,
		});
	}
};
