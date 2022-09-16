import React from "react";
import "./_comment.scss";
import avatar from "./../../images/avatar.png";
import moment from "moment";

const Comment = ({ comment }) => {
	return (
		<div className="comment p-3 d-flex">
			<img src={avatar} alt="" className="rounded-circle mr-3" />
			<div className="comment__body">
				<p className="comment__header mb-1">
					{comment.authorDisplayName} • {moment(comment.publishedAt).fromNow()}
				</p>
				<p className="mb-0">{comment.textDisplay}</p>
			</div>
		</div>
	);
};

export default Comment;
