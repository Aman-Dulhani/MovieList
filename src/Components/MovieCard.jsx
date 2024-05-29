import React from "react";
import { useState } from "react";
import { detailsURL, imgURL, useGet } from "../Hooks/useGet";
import "../Styles/MovieCard.css";
import DialogComponent from "./DialogComponent";
// import Loading from "./Loading";

const transformDetails = (details) => {
	const movieGeners = details.genres.map((genre) => genre.name).join(", ");
	let director = details.credits?.crew.filter(
		(crew) => crew.job === "Director"
	)[0];
	return {
		genres: movieGeners,
		cast: details?.credits?.cast || [],
		director: director || { name: "" },
	};
};

export const Details = ({ rating, description, details }) => {
	const { genres, cast, director } = details;
	console.log(details);
	return (
		<div className="movie-description">
			<span>
				<strong>Description:</strong> {description}
			</span>
			<span>
				<strong>Genres:</strong> {genres}
			</span>
			<span>
				<strong>Director:</strong> {director.name}
			</span>
			<span>
				<strong>Rating:</strong> {rating}
			</span>
		</div>
	);
};

export const MovieCard = ({ movie }) => {
	const [open, setOpen] = useState(false);
	const { title, poster, ...otherProps } = movie;
	const [details, loading] = useGet(detailsURL + movie.id, {
		params: { external_source: "imdb_id", append_to_response: "credits" },
		transform: transformDetails,
	});
	// const textColor = getContrastColor(movie.poster_path);
	return (
		<React.Fragment>
			<div
				className="movie-card"
				style={{ backgroundImage: `url(${imgURL + poster})` }}
			>
				<div
					className="movie-details"
					// style={{ color: textColor }}
				>
					<h3>{title}</h3>
					<button onClick={() => setOpen(true)}>Show more</button>
				</div>
			</div>
			<DialogComponent
				isOpen={open}
				onClose={() => setOpen(false)}
			>
				<Details
					{...otherProps}
					details={details}
				/>
			</DialogComponent>
		</React.Fragment>
	);
};
