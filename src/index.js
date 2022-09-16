import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./_base.scss";
import store from "../src/components/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
