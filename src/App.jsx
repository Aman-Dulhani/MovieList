import "./Styles/App.css";
import AppBar from "./AppBar";
import MoviesContainer from "./MoviesContainer";
import { useEffect, useState } from "react";
import { getData } from "./commonUtils";
import { genreURL } from "./commonUtils";

function App() {
	const [genres, setGenres] = useState([]);
	const [selected, setSelected] = useState([]);
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
				genres={genres}
				handleOnClick={onSelect}
				selected={selected}
			/>
			<div style={{ marginTop: 120, padding: 10 }}>
				<MoviesContainer selectedGenres={selected} />
			</div>
		</div>
	);
}

export default App;
