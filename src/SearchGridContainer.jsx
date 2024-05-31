import { useCallback, useState } from "react";
import { getData, searchURL } from "./commonUtils";
import { MovieCard } from "./MovieCard";
import InfiniteScrollComponent from "./Components/InfiniteScrollComponent";

const transformResult = (response) => {
	const movies = response?.results?.map((movie) => ({
		id: movie.id,
		title: movie.title,
		poster: movie.poster_path ? movie.poster_path : movie.backdrop_path,
		description: movie.overview,
		rating: movie.vote_average.toFixed(1),
	}));
	return {
		totalPages: response.total_pages,
		results: movies || [],
	};
};

const SearchGridContainer = ({ inputValue }) => {
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(2);

	const loadInitial = useCallback(async () => {
		const initialMovies = await getData(searchURL, {
			debounce: 3000,
			transform: transformResult,
			extraParams: { query: inputValue, page: 1 },
		});
		setMaxPage(initialMovies.totalPages);
		return initialMovies;
	}, [inputValue]);

	const loadNextData = useCallback(async () => {
		let newMovies;
		if (page < maxPage) {
			const nextPage = page + 1;
			newMovies = await getData(searchURL, {
				debounce: 500,
				transform: transformResult,
				extraParams: { query: inputValue, page: nextPage },
			});
			setPage(nextPage);
			setMaxPage(newMovies.totalPages);
		}
		return newMovies;
	}, [inputValue, maxPage, page]);

	const renderItems = (items) => {
		return (
			<div style={{ width: "100%" }}>
				<div className="movie-container">
					{items.length > 0 &&
						items.map((movie) => (
							<MovieCard
								movie={movie}
								key={movie.id}
							/>
						))}
				</div>
			</div>
		);
	};

	return (
		<div>
			<InfiniteScrollComponent
				loadNextData={loadNextData}
				initialLoad={loadInitial}
				shouldLoadPrevious={false}
				renderItems={renderItems}
				dataKey="results"
			/>
		</div>
	);
};

export default SearchGridContainer;
