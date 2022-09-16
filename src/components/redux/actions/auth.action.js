import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import auth from "../../../firebase";
import {
	LOAD_PROFILE,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOG_OUT,
} from "../actionType";

export const login = () => (dispatch) => {
	const provider = new GoogleAuthProvider();
	provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

	dispatch({
		type: LOGIN_REQUEST,
	});
	signInWithPopup(auth, provider)
		.then((res) => {
			const credential = GoogleAuthProvider.credentialFromResult(res);
			const token = credential.accessToken;
			const user = res.user;
			const profile = {
				name: user.displayName,
				photoUrl: user.photoURL,
			};
			sessionStorage.setItem("YTC-access-token", token);
			sessionStorage.setItem("YTC-user", JSON.stringify(profile));

			dispatch({
				type: LOGIN_SUCCESS,
				payload: token,
			});
			dispatch({
				type: LOAD_PROFILE,
				payload: profile,
			});
		})
		.catch((err) => {
			const errorMessage = err.message;
			console.log(errorMessage);
			dispatch({
				type: LOGIN_FAIL,
				error: errorMessage,
			});
		});
};

export const logout = () => (dispatch) => {
	signOut(auth)
		.then(() => {
			dispatch({
				type: LOG_OUT,
			});
			sessionStorage.removeItem("YTC-access-token");
			sessionStorage.removeItem("YTC-user");
		})
		.catch((err) => {
			console.log(err);
		});
};
