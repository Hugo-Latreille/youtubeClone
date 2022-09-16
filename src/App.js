import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./_app.scss";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/watchScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";

require("dotenv").config();

const Layout = ({ children }) => {
	const [sidebar, toggleSidebar] = useState(false);
	const handleToggleSidebar = () =>
		sidebar ? toggleSidebar(false) : toggleSidebar(true);
	return (
		<div>
			<Header handleToggleSidebar={handleToggleSidebar} />
			<div className="app_container">
				<Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
				<Container fluid className="app_main">
					{children}
				</Container>
			</div>
		</div>
	);
};

function App() {
	const { accessToken, loading } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !accessToken) {
			navigate("/auth");
		}
	}, [accessToken, loading, navigate]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<HomeScreen />
					</Layout>
				}
			/>
			<Route path="/auth" element={<LoginScreen />} />
			<Route
				path="/search/:query"
				element={
					<Layout>
						<SearchScreen />
					</Layout>
				}
			/>
			<Route
				path="/watch/:id"
				element={
					<Layout>
						<WatchScreen />
					</Layout>
				}
			/>
			<Route
				path="/feed/subscriptions"
				element={
					<Layout>
						<SubscriptionsScreen />
					</Layout>
				}
			/>
			<Route
				path="/channel/:channelId"
				element={
					<Layout>
						<ChannelScreen />
					</Layout>
				}
			/>
			<Route path="*" element={<Navigate replace to="/" />} />
		</Routes>
	);
}

export default App;
