import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./_loginScreen.scss";
import { login } from "./../../components/redux/actions/auth.action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const LoginScreen = () => {
	const dispatch = useDispatch();
	const handleLogin = () => {
		dispatch(login());
	};
	const accessToken = useSelector((state) => state.auth.accessToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	return (
		<div className="login">
			<div className="login__container">
				<img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
				<button onClick={handleLogin}>Login With Google</button>
				<p>This project is made using Youtube Data API</p>
			</div>
		</div>
	);
};

export default LoginScreen;
