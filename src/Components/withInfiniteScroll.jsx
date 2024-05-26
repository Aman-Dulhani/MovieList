// src/withInfiniteScroll.js
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

const withInfiniteScroll = (Component, fetchPrevious, fetchNext) => {
	return function WrappedComponent(props) {
		const containerRef = useRef(null);
		const [isFetchingPrev, setIsFetchingPrev] = useState(false);
		const [isFetchingNext, setIsFetchingNext] = useState(false);

		useEffect(() => {
			const handleScroll = async () => {
				const container = containerRef.current;
				if (container.scrollTop === 0 && !isFetchingPrev) {
					const scrollHeightBeforeUpdate = container.scrollHeight;
					setIsFetchingPrev(true);
					await fetchPrevious();
					setIsFetchingPrev(false);
					container.scrollTop =
						container.scrollHeight - scrollHeightBeforeUpdate;
				} else if (
					container.scrollTop + container.clientHeight >=
						container.scrollHeight - 2 &&
					!isFetchingNext
				) {
					const scrollTopBeforeUpdate = container.scrollTop;
					setIsFetchingNext(true);
					await fetchNext();
					setIsFetchingNext(false);
					container.scrollTop = scrollTopBeforeUpdate;
				}
			};

			const container = containerRef.current;
			container.addEventListener("scroll", handleScroll);
			return () => {
				container.removeEventListener("scroll", handleScroll);
			};
		}, [isFetchingNext, isFetchingPrev]);

		return (
			<div
				ref={containerRef}
				className="scrollable-container"
			>
				{isFetchingPrev ? <Loading /> : null}
				<Component {...props} />
				{isFetchingNext ? <Loading /> : null}
			</div>
		);
	};
};

export default withInfiniteScroll;
