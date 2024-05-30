// import React from 'react';
import "./Styles/AppBar.css";
import { useState } from "react";
import SearchInput from "./Components/SearchInput";
import { netflixLogo } from "./commonUtils";

export const AppBar = ({ setSearchResults }) => {
	const [showSearch, setShowSearch] = useState(false);
	const [inputValue, setInputValue] = useState("");
	console.log(setSearchResults);
	return (
		<div className="app-bar">
			<div className="app-bar__logo">
				<img
					src={netflixLogo}
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
		</div>
	);
};

export default AppBar;
