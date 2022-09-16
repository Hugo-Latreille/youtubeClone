import axios from "axios";

const request = axios.create({
	baseURL: "https://youtube.googleapis.com/youtube/v3",
	params: {
		key: "AIzaSyAWn8bbvhViqbXyH8Kk7_fURuLfeq_FqcI",
	},
});

export default request;
