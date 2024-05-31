const Chip = ({ title, onClick, selected, id }) => {
	return (
		<button
			className={"chip-button" + (selected ? " selected" : "")}
			onClick={() => onClick(id, !selected)}
		>
			{title}
		</button>
	);
};

export default Chip;
