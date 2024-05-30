import "../Styles/SearchInput.css";

const SearchInput = ({ inputValue, setInputValue, onClear }) => {
	return (
		<div className="input-container">
			<input
				type="text"
				className="input-field"
				placeholder="Type something..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				className="clear-button"
				onClick={onClear}
			>
				Clear Search
			</button>
		</div>
	);
};

export default SearchInput;
