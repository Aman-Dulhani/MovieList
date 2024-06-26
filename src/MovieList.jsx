// import React from 'react';
// import { baseURL, useGet } from "../Hooks/useGet";
import { MovieCard } from "./MovieCard";

export const MovieList = ({ items }) => {
	return (
		<div style={{ width: "100%" }}>
			{items?.length > 0 &&
				items?.map((item) => (
					<div key={item.year}>
						<h1>{item.year}</h1>
						<div className="movie-container">
							{item.results.length > 0 &&
								item.results.map((movie) => (
									<MovieCard
										movie={movie}
										key={movie.id}
									/>
								))}
						</div>
					</div>
				))}
		</div>
	);
};

export default MovieList;
