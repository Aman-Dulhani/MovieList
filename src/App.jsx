// import { useState } from "react";
import "./Styles/App.css";
import AppBar from "./Components/AppBar";
// import MovieList from "./Components/MovieList";
import { MoviesContainer } from "./Components/MoviesContainer";
import { useEffect, useState } from "react";
import { getData } from "./Components/commonUtils";
import { genreURL } from "./Hooks/useGet";
// import { useGet, baseURL } from "./Hooks/useGet";

// &sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100

function App() {
	const [genres, setGenres] = useState([]);
	useEffect(() => {
		const getGenres = async () => {
			const fetchedGenres = await getData(genreURL);
			setGenres(fetchedGenres.genres);
		};
		getGenres();
	}, []);
	return (
		<div style={{ overflow: "hidden" }}>
			<AppBar genres={genres} />
			<div style={{ marginTop: 130, padding: 10 }}>
				<MoviesContainer />
			</div>
		</div>
	);
}

export default App;
