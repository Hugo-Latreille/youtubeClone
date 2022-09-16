import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import Video from "../../components/Video/Video";
import { useDispatch } from "react-redux";
import {
	getPopularVideos,
	getVideosByCategory,
} from "../../components/redux/actions/videos.action";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonVideos from "../../components/skeletons/skeletonsVideos";

const HomeScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPopularVideos());
	}, [dispatch]);

	const videos = useSelector((state) => state.homeVideos.videos);
	const activeCategory = useSelector(
		(state) => state.homeVideos.activeCategory
	);
	const loading = useSelector((state) => state.homeVideos.loading);

	const fetchData = () => {
		if (activeCategory === "All") {
			dispatch(getPopularVideos());
		} else {
			dispatch(getVideosByCategory(activeCategory));
		}
	};

	return (
		<Container>
			<CategoriesBar />
			<InfiniteScroll
				dataLength={videos.length}
				next={fetchData}
				hasMore={true}
				loader={
					<div className="spinner-border text-danger d-block mx-auto"></div>
				}
				className="row"
			>
				{!loading
					? videos.map((video) => (
							<Col lg={3} md={4} key={video.id}>
								<Video video={video} />
							</Col>
					  ))
					: [...Array(20)].map(() => (
							<Col lg={3} md={4}>
								<SkeletonVideos />
							</Col>
					  ))}
			</InfiniteScroll>
		</Container>
	);
};

export default HomeScreen;
