import {
	HOME_VIDEOS_FAIL,
	HOME_VIDEOS_REQUEST,
	HOME_VIDEOS_SUCCESS,
	SELECTED_VIDEO_REQUEST,
	SELECTED_VIDEO_SUCCESS,
	SELECTED_VIDEO_FAIL,
	RELATED_VIDEO_REQUEST,
	RELATED_VIDEO_SUCCESS,
	RELATED_VIDEO_FAIL,
	SUBSCRIPTIONS_CHANNEL_FAIL,
	SUBSCRIPTIONS_CHANNEL_REQUEST,
	SUBSCRIPTIONS_CHANNEL_SUCCESS,
	CHANNEL_VIDEOS_FAIL,
	CHANNEL_VIDEOS_REQUEST,
	CHANNEL_VIDEOS_SUCCESS,
} from "../actionType";

const initialState = {
	videos: [],
	loading: false,
	nextPageToken: null,
	activeCategory: "All",
};

export const homeVideosReducer = (state = initialState, action) => {
	switch (action.type) {
		case HOME_VIDEOS_SUCCESS:
			return {
				...state,
				videos:
					state.activeCategory === action.payload.category
						? [...state.videos, ...action.payload.videos]
						: action.payload.videos,

				loading: false,
				nextPageToken: action.payload.nextPageToken,
				activeCategory: action.payload.category,
			};
		case HOME_VIDEOS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case HOME_VIDEOS_REQUEST:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};

export const selectedVideoReducer = (
	state = {
		loading: true,
		video: null,
	},
	action
) => {
	switch (action.type) {
		case SELECTED_VIDEO_REQUEST:
			return { ...state, loading: true };

		case SELECTED_VIDEO_SUCCESS:
			return {
				...state,
				video: action.payload,
				loading: false,
			};
		case SELECTED_VIDEO_FAIL:
			return {
				...state,
				video: null,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const relatedVideoReducer = (
	state = {
		loading: true,
		videos: null,
	},
	action
) => {
	switch (action.type) {
		case RELATED_VIDEO_REQUEST:
			return { ...state, loading: true };

		case RELATED_VIDEO_SUCCESS:
			return {
				...state,
				videos: action.payload,
				loading: false,
			};
		case RELATED_VIDEO_FAIL:
			return {
				...state,
				videos: null,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const subscriptionsChannelReducer = (
	state = {
		loading: true,
		videos: [],
	},
	action
) => {
	const { payload, type } = action;

	switch (type) {
		case SUBSCRIPTIONS_CHANNEL_REQUEST:
			return {
				...state,
				loading: true,
			};
		case SUBSCRIPTIONS_CHANNEL_SUCCESS:
			return {
				...state,
				videos: payload,
				loading: false,
			};
		case SUBSCRIPTIONS_CHANNEL_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};

export const channelVideosReducer = (
	state = {
		loading: true,
		videos: [],
	},
	action
) => {
	const { payload, type } = action;

	switch (type) {
		case CHANNEL_VIDEOS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CHANNEL_VIDEOS_SUCCESS:
			return {
				...state,
				videos: payload,
				loading: false,
			};
		case CHANNEL_VIDEOS_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};
