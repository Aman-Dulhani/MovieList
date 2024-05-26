// import React from 'react';
import "../Styles/AppBar.css";
import { Chip } from "./Genre";

export const AppBar = ({ genres, handleOnClick }) => {
	return (
		<div className="app-bar">
			<div className="app-bar__logo">
				<img
					src="https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
					alt="Logo"
				/>
			</div>
			<div className="app-bar__menu">
				{genres &&
					genres.map((genre) => (
						<Chip
							title={genre.name}
							key={genre.id}
							onClick={handleOnClick}
						/>
					))}
			</div>
		</div>
	);
};

export default AppBar;
