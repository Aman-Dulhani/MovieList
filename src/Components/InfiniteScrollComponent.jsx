import { useState, useEffect, useRef, useCallback } from "react";
import Loading from "./Loading";
// import PropTypes from "prop-types";

const InfiniteScrollComponent = ({
	loadPrevData,
	loadNextData,
	renderItems,
	initialLoad,
	shouldLoadPrevious,
	dataKey,
}) => {
	const [items, setItems] = useState([]);
	const [isFetchingPrev, setIsFetchingPrev] = useState(false);
	const [isFetchingNext, setIsFetchingNext] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsFetching(true);
			const newItems = await initialLoad();
			setItems([...newItems[dataKey]]);
			setIsFetching(false);
		};
		fetchData();
		if (containerRef.current) {
			containerRef.current.scrollTo(0, 2);
		}
	}, [dataKey, initialLoad]);

	const handleScroll = useCallback(async () => {
		const container = containerRef.current;
		if (!container) return;

		if (
			container.scrollTop + container.clientHeight >=
				container.scrollHeight - 5 &&
			!isFetchingNext &&
			!isFetching
		) {
			setIsFetchingNext(true);
			const newMovies = await loadNextData();
			if (newMovies) {
				setItems((prevMovies) => [...prevMovies, ...newMovies[dataKey]]);
			}
			setIsFetchingNext(false);
		}

		if (
			shouldLoadPrevious &&
			container.scrollTop === 0 &&
			!isFetchingPrev &&
			!isFetching
		) {
			setIsFetchingPrev(true);
			const newMovies = await loadPrevData();
			if (newMovies) {
				setItems((prevMovies) => [...newMovies[dataKey], ...prevMovies]);
			}
			setIsFetchingPrev(false);
		}
	}, [
		containerRef,
		isFetchingNext,
		isFetchingPrev,
		loadNextData,
		loadPrevData,
		shouldLoadPrevious,
		dataKey,
		isFetching,
	]);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
			return () => {
				// console.log("UNMOUNT");
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, [containerRef, handleScroll]);

	return (
		<div
			ref={containerRef}
			className="scrollable-container"
		>
			{isFetchingPrev ? <Loading /> : null}
			{!isFetching ? renderItems(items) : <Loading />}
			{isFetchingNext ? <Loading /> : null}
		</div>
	);
};

export default InfiniteScrollComponent;
