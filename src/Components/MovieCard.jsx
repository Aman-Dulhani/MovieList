// import React from "react";
import { imgURL } from "../Hooks/useGet";
import "../Styles/MovieCard.css";

export const Details = ({ adult, rating, description }) => {
	return (
		<div className="movie-description">
			<span>
				<strong>U/A Rating:</strong> {adult ? "A" : "U/A"}
			</span>
			<span>
				<strong>Description:</strong> {description}
			</span>
			<span>
				<strong>Rating:</strong> {rating}
			</span>
		</div>
	);
};

export const MovieCard = (props) => {
	const { title, poster, ...otherProps } = props;
	// const textColor = getContrastColor(movie.poster_path);
	return (
		<div
			className="movie-card"
			style={{ backgroundImage: `url(${imgURL + poster})` }}
		>
			<div
				className="movie-details"
				// style={{ color: textColor }}
			>
				<h3>{title}</h3>
				<Details {...otherProps} />
			</div>
		</div>
	);
};
