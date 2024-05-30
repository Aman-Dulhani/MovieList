// import React from 'react';
import "./Styles/AppBar.css";
import { Chip } from "./Components/Genre";
import { useState } from "react";
import SearchInput from "./Components/SearchInput";

export const AppBar = ({
	genres,
	handleOnClick,
	selected,
	setSearchResults,
}) => {
	const [showSearch, setShowSearch] = useState(false);
	const [inputValue, setInputValue] = useState("");
	console.log(setSearchResults);
	return (
		<div className="app-bar">
			<div className="app-bar__logo">
				<img
					src="https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
					alt="Logo"
				/>
				{!showSearch ? (
					<button
						className="search-button"
						onClick={() => setShowSearch(true)}
					>
						Search
					</button>
				) : (
					<SearchInput
						inputValue={inputValue}
						setInputValue={setInputValue}
						onClear={() => {
							setInputValue("");
							setShowSearch(false);
						}}
					/>
				)}
			</div>
			<div className="app-bar__menu">
				{genres &&
					genres.map((genre) => (
						<Chip
							title={genre.name}
							key={genre.id}
							id={genre.id}
							onClick={handleOnClick}
							selected={selected.includes(genre.id)}
						/>
					))}
			</div>
		</div>
	);
};

export default AppBar;
