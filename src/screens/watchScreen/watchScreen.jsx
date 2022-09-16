import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import "./_watchScreen.scss";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	getRelatedVideos,
	getVideoById,
} from "../../components/redux/actions/videos.action";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WatchScreen = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getVideoById(id));
		dispatch(getRelatedVideos(id));
	}, [dispatch, id]);

	const { loading, video } = useSelector((state) => state.selectedVideo);
	const { loading: relatedVideosLoading, videos } = useSelector(
		(state) => state.relatedVideos
	);

	return (
		<Row>
			<Col lg={8}>
				<div className="watchScreen__player">
					<iframe
						src={`http://www.youtube.com/embed/${id}`}
						frameborder="0"
						title={video?.snippet.title}
						allowFullScreen
						width="100%"
						height="100%"
					></iframe>
				</div>
				{!loading ? (
					<VideoMetaData video={video} videoId={id} />
				) : (
					<h6>Loading...</h6>
				)}
				<Comments
					videoId={id}
					totalComments={video?.statistics?.commentCount}
				/>
			</Col>
			<Col lg={4}>
				{!relatedVideosLoading ? (
					videos
						?.filter((video) => video.snippet)
						.map((video) => (
							<VideoHorizontal video={video} key={video.id.videoId} />
						))
				) : (
					<SkeletonTheme baseColor="#343a40" highlightColor="3c4147">
						<Skeleton width="100%" height="130px" count={15} />
					</SkeletonTheme>
				)}
			</Col>
		</Row>
	);
};

export default WatchScreen;
