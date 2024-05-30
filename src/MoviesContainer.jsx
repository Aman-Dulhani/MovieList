import { useCallback, useEffect, useState } from "react";
import { getData, baseURL } from "./commonUtils";
import MovieList from "./MovieList";
import InfiniteScrollComponent from "./Components/InfiniteScrollComponent";

const transformMovies = (response, options) => {
	const movies = response?.results?.map((movie) => ({
		id: movie.id,
		title: movie.title,
		poster: movie.poster_path,
		description: movie.overview,
		rating: movie.vote_average.toFixed(1),
	}));
	return {
		year: options.extraParams?.primary_release_year,
		results: movies || [],
	};
};

const commonParams = {
	sort_by: "popularity.desc",
	page: 1,
	"vote_count.gte": 100,
};

const getParams = (year, genres) => {
	let params = {
		...commonParams,
		primary_release_year: year,
	};
	if (genres.length > 0) {
		const filter = genres.join("|");
		params = {
			...params,
			with_genres: filter,
		};
	}
	return params;
};

const MoviesContainer = ({ selectedGenres }) => {
	const [minYear, setMinYear] = useState(2012);
	const [maxYear, setMaxYear] = useState(2012);

	useEffect(() => {
		setMaxYear(2012);
		setMinYear(2012);
	}, [selectedGenres]);

	const loadInitial = useCallback(async () => {
		const initialMovies = await getData(baseURL, {
			debounce: 500,
			transform: transformMovies,
			extraParams: getParams(2012, selectedGenres),
		});
		return initialMovies;
	}, [selectedGenres]);

	const loadPrevData = useCallback(async () => {
		let newMovies;
		if (minYear > 2010) {
			const prevYear = minYear - 1;
			newMovies = await getData(baseURL, {
				debounce: 500,
				transform: transformMovies,
				extraParams: getParams(prevYear, selectedGenres),
			});
			setMinYear(prevYear);
		}
		return newMovies;
	}, [minYear, selectedGenres]);

	const loadNextData = useCallback(async () => {
		let newMovies;
		if (maxYear < new Date().getFullYear()) {
			const nextYear = maxYear + 1;
			newMovies = await getData(baseURL, {
				debounce: 500,
				transform: transformMovies,
				extraParams: getParams(nextYear, selectedGenres),
			});
			setMaxYear(nextYear);
		}
		return newMovies;
	}, [maxYear, selectedGenres]);

	const renderItems = (items) => {
		return <MovieList items={items} />;
	};

	return (
		<div>
			<InfiniteScrollComponent
				loadNextData={loadNextData}
				initialLoad={loadInitial}
				loadPrevData={loadPrevData}
				renderItems={renderItems}
				dataKey="movies"
			/>
		</div>
	);
};

export default MoviesContainer;
