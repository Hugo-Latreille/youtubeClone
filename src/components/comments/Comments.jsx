import React, { useEffect, useState } from "react";
import "./_comments.scss";
import avatar from "../../images/avatar.png";
import Comment from "../Comment/Comment";
import { useDispatch } from "react-redux";
import {
	addComment,
	getCommentsOfVideoById,
} from "../redux/actions/comments.action";
import { useSelector } from "react-redux";

const Comments = ({ videoId, totalComments }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCommentsOfVideoById(videoId));
	}, [dispatch, videoId]);

	const comments = useSelector((state) => state.comments.comments);
	const commentsList = comments?.map(
		(comment) => comment.snippet.topLevelComment.snippet
	);

	const [text, setText] = useState("");

	const handleComment = (e) => {
		e.preventDefault();
		if (text.length === 0) return;
		dispatch(addComment(videoId, text));
		setText("");
	};

	return (
		<div className="comments">
			<p>{totalComments} Comments</p>
			<div className="comments__form d-flex w-100 my-2">
				<img src={avatar} alt="" className="rounded-circle mr-3" />
				<form className="d-flex flex-grow-1" onSubmit={handleComment}>
					<input
						type="text"
						className="flex-grow-1"
						placeholder="Write a comment..."
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button className="border-0 p-2">Comment</button>
				</form>
			</div>
			<div className="comments__list">
				{commentsList?.map((comment, index) => (
					<Comment comment={comment} key={index} />
				))}
			</div>
		</div>
	);
};

export default Comments;
