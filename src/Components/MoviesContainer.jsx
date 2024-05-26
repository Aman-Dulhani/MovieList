import { useEffect, useRef, useState, useCallback } from "react";
// import { baseURL, getAxiosParams } from "../Hooks/useGet";
import MovieList from "./MovieList";
// import withInfiniteScroll from "./withInfiniteScroll";
// import axios from "axios";
import Loading from "./Loading";
import { getData } from "./commonUtils";
import { baseURL } from "../Hooks/useGet";

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

// const fetchMovies = async (year) => {
// 	const extraParams = {
// 		sort_by: "popularity.desc",
// 		primary_release_year: year,
// 		page: 1,
// 		"vote_count.gte": 100,
// 	};
// 	const axiosParams = getAxiosParams("get", baseURL, extraParams);
// 	const response = await axios(axiosParams);
// 	return {
// 		year,
// 		results: response.data.results,
// 	};
// };

export const MoviesContainer = () => {
	const [movies, setMovies] = useState([]);
	const [currentYear] = useState(2012);
	const [minYear, setMinYear] = useState(2012);
	const [maxYear, setMaxYear] = useState(2012);
	const [isFetchingPrev, setIsFetchingPrev] = useState(false);
	const [isFetchingNext, setIsFetchingNext] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const loadInitialMovies = async () => {
			const initialMovies = await getData(baseURL, {
				debounce: 500,
				transform: transformMovies,
				extraParams: { ...commonParams, primary_release_year: 2012 },
			});
			setMovies([initialMovies]);
		};

		loadInitialMovies();
	}, [currentYear]);

	const handleScroll = useCallback(async () => {
		const container = containerRef.current;
		if (!container) return;

		if (
			container.scrollTop + container.clientHeight >=
				container.scrollHeight - 10 &&
			!isFetchingNext
		) {
			setIsFetchingNext(true);
			const nextYear = maxYear + 1;
			const newMovies = await getData(baseURL, {
				debounce: 500,
				transform: transformMovies,
				extraParams: { ...commonParams, primary_release_year: nextYear },
			});
			setMaxYear(nextYear);
			setMovies((prevMovies) => [...prevMovies, newMovies]);
			setIsFetchingNext(false);
		}

		if (container.scrollTop < 1 && !isFetchingPrev) {
			setIsFetchingPrev(true);
			if (minYear > 2010) {
				const prevYear = minYear - 1;
				const newMovies = await getData(baseURL, {
					debounce: 500,
					transform: transformMovies,
					extraParams: { ...commonParams, primary_release_year: prevYear },
				});
				setMinYear(prevYear);
				setMovies((prevMovies) => [newMovies, ...prevMovies]);
			}
			setIsFetchingPrev(false);
		}
	}, [maxYear, minYear, isFetchingNext, isFetchingPrev]);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
			return () => container.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);

	return (
		<div
			ref={containerRef}
			className="scrollable-container"
		>
			{isFetchingPrev && <Loading />}
			<MovieList items={movies} />
			{isFetchingNext && <Loading />}
		</div>
	);
};
