import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideosByCategory } from "../redux/actions/videos.action";
import "./_categoriesBar.scss";
import { getPopularVideos } from "./../redux/actions/videos.action";

const CategoriesBar = () => {
	const keywords = [
		"All",
		"React js",
		"Angular js",
		"React Native",
		"use of API",
		"Redux",
		"Music",
		"Star Citizen",
		"Noir Désir",
		"Coding",
		"Poor Coder",
		"cigarette éléctronique",
	];
	const dispatch = useDispatch();
	const [activeElement, setActiveElement] = useState("All");
	const handleClick = (value) => {
		setActiveElement(value);
		if (value === "All") {
			dispatch(getPopularVideos());
		} else {
			dispatch(getVideosByCategory(value));
		}
	};
	return (
		<div className="categoriesBar">
			{keywords.map((value, i) => (
				<span
					key={i}
					onClick={() => handleClick(value)}
					className={activeElement === value ? "active" : ""}
				>
					{value}
				</span>
			))}
		</div>
	);
};

export default CategoriesBar;
