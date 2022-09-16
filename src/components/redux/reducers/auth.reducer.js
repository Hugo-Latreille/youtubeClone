import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST } from "../actionType";
import { LOGIN_SUCCESS, LOG_OUT } from "./../actionType";

const initialState = {
	accessToken: sessionStorage.getItem("YTC-access-token")
		? sessionStorage.getItem("YTC-access-token")
		: null,
	user: sessionStorage.getItem("YTC-user")
		? JSON.parse(sessionStorage.getItem("YTC-user"))
		: null,
	loading: false,
};

export const authReducer = (state = initialState, action) => {
	// const {type,payload} = action
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				accessToken: action.payload,
				loading: false,
			};
		case LOGIN_FAIL:
			return {
				...state,
				accessToken: null,
				loading: false,
				error: action.payload,
			};
		case LOAD_PROFILE:
			return {
				...state,
				user: action.payload,
			};
		case LOG_OUT:
			return {
				accessToken: null,
				user: null,
				loading: false,
			};
		default:
			return state;
	}
};
