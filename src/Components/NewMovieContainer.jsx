import { useCallback, useState } from "react";
import { baseURL } from "../Hooks/useGet";
import { getData } from "./commonUtils";
import MovieList from "./MovieList";
import InfiniteScrollComponent from "./InfiniteScrollComponent";

const transformMovies = (response, options) => {
	return {
		year: options.extraParams?.primary_release_year,
		results: response.results,
	};
};

const commonParams = {
	sort_by: "popularity.desc",
	page: 1,
	"vote_count.gte": 100,
};

export const NewMovieContainer = () => {
	const [minYear, setMinYear] = useState(2012);
	const [maxYear, setMaxYear] = useState(2012);

	const loadInitial = useCallback(async () => {
		const initialMovies = await getData(baseURL, {
			debounce: 500,
			transform: transformMovies,
			extraParams: { ...commonParams, primary_release_year: 2012 },
		});
		return initialMovies;
	}, []);

	const loadPrevData = useCallback(async () => {
		let newMovies;
		if (minYear > 2010) {
			const prevYear = minYear - 1;
			newMovies = await getData(baseURL, {
				debounce: 500,
				transform: transformMovies,
				extraParams: { ...commonParams, primary_release_year: prevYear },
			});
			setMinYear(prevYear);
		}
		return newMovies;
	}, [minYear]);

	const loadNextData = useCallback(async () => {
		const nextYear = maxYear + 1;
		let newMovies = await getData(baseURL, {
			debounce: 500,
			transform: transformMovies,
			extraParams: { ...commonParams, primary_release_year: nextYear },
		});
		setMaxYear(nextYear);
		return newMovies;
	}, [maxYear]);

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
