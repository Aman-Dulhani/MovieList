import React from "react";
import { useState } from "react";
import { useGet } from "../Hooks/useGet";
import "../Styles/MovieCard.css";
import DialogComponent from "./DialogComponent";
import Loading from "./Loading";
import { imgURL, detailsURL } from "./commonUtils";

const transformDetails = (details) => {
	const movieGeners = details.genres.map((genre) => genre.name).join(", ");
	let director = details.credits?.crew.filter(
		(crew) => crew.job === "Director"
	)[0];
	let cast = details.credits?.cast.map((c) => c.name).join(", ");
	return {
		genres: movieGeners,
		cast: cast,
		director: director?.name || "",
	};
};

export const Details = ({ rating, description, details, poster }) => {
	const { genres, cast, director } = details;
	return (
		<div className="movie-description">
			<span style={{ margin: "auto auto" }}>
				<img
					src={imgURL + poster}
					style={{
						height: "400px",
						width: "250px",
					}}
				/>
			</span>
			<span>
				<strong>Description:</strong> {description}
			</span>
			<span>
				<strong>Genres:</strong> {genres}
			</span>
			<span>
				<strong>Cast:</strong> {cast}
			</span>
			<span>
				<strong>Director:</strong> {director}
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
		ready: !!open,
	});
	return (
		<React.Fragment>
			<div
				className="movie-card"
				style={{ backgroundImage: `url(${imgURL + poster})` }}
			>
				<div className="movie-details">
					<h3>{title}</h3>
					<button
						style={{
							background: "transparent",
							border: "2px solid white",
							borderRadius: "8px",
							height: "fit-content",
						}}
						onClick={() => setOpen(true)}
					>
						Show Details
					</button>
				</div>
			</div>
			<DialogComponent
				isOpen={open}
				onClose={() => setOpen(false)}
				title={title}
			>
				{loading ? (
					<Loading />
				) : (
					<Details
						{...otherProps}
						details={details}
						poster={poster}
					/>
				)}
			</DialogComponent>
		</React.Fragment>
	);
};
