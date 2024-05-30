// import React from 'react';
import "./Styles/AppBar.css";
import { useState } from "react";
import SearchInput from "./Components/SearchInput";
import { netflixLogo } from "./commonUtils";

export const AppBar = ({ inputValue, setInputValue }) => {
	const [showSearch, setShowSearch] = useState(false);
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
