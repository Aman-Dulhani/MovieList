import { useState, useEffect, useRef, useCallback } from "react";
import Loading from "./Loading";
// import PropTypes from "prop-types";

const InfiniteScrollComponent = ({
	loadPrevData,
	loadNextData,
	renderItems,
	initialLoad,
}) => {
	const [items, setItems] = useState([]);
	const [isFetchingPrev, setIsFetchingPrev] = useState(false);
	const [isFetchingNext, setIsFetchingNext] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const newItems = await initialLoad();
			setItems([newItems]);
		};
		fetchData();
		if (containerRef.current) {
			containerRef.current.scrollTo(0, 2);
		}
	}, [initialLoad]);

	const handleScroll = useCallback(async () => {
		const container = containerRef.current;
		if (!container) return;

		if (
			container.scrollTop + container.clientHeight >=
				container.scrollHeight - 5 &&
			!isFetchingNext
		) {
			setIsFetchingNext(true);
			const newMovies = await loadNextData();
			if (newMovies) {
				setItems((prevMovies) => [...prevMovies, newMovies]);
			}
			setIsFetchingNext(false);
		}

		if (container.scrollTop === 0 && !isFetchingPrev) {
			setIsFetchingPrev(true);
			const newMovies = await loadPrevData();
			if (newMovies) {
				setItems((prevMovies) => [newMovies, ...prevMovies]);
			}
			setIsFetchingPrev(false);
		}
	}, [
		containerRef,
		isFetchingNext,
		isFetchingPrev,
		loadNextData,
		loadPrevData,
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
			{items.length > 0 ? renderItems(items) : null}
			{isFetchingNext ? <Loading /> : null}
		</div>
	);
};

export default InfiniteScrollComponent;
