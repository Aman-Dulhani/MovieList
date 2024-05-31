import "./Styles/App.css";
import AppBar from "./AppBar";
import MoviesContainer from "./MoviesContainer";
import { useEffect, useState } from "react";
import { getData } from "./commonUtils";
import { genreURL } from "./commonUtils";
import Chip from "./Components/ChipButton";
import SearchGridContainer from "./SearchGridContainer";

function HomePage() {
	const [genres, setGenres] = useState([]);
	const [selected, setSelected] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const getGenres = async () => {
			const fetchedGenres = await getData(genreURL);
			setGenres(fetchedGenres.genres);
		};
		getGenres();
	}, []);
	const onSelect = (id, checked) => {
		if (checked) {
			setSelected((prev) => [...prev, id]);
		} else {
			const index = selected.indexOf(id);
			if (index > -1) {
				const newSelected = [
					...selected.slice(0, index),
					...selected.slice(index + 1),
				];
				setSelected(newSelected);
			}
		}
	};
	return (
		<div style={{ overflow: "hidden" }}>
			<AppBar
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
			<div style={{ marginTop: 60 }}>
				{inputValue.length === 0 ? (
					<>
						<div className="filters">
							{genres &&
								genres.map((genre) => (
									<Chip
										title={genre.name}
										key={genre.id}
										id={genre.id}
										onClick={onSelect}
										selected={selected.includes(genre.id)}
									/>
								))}
						</div>
						<MoviesContainer selectedGenres={selected} />
					</>
				) : (
					<SearchGridContainer inputValue={inputValue} />
				)}
			</div>
		</div>
	);
}

export default HomePage;
