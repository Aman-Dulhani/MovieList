export const Chip = ({ title, key, onClick }) => {
	return (
		<button
			className="chip-button"
			key={key}
			onClick={() => onClick(key)}
		>
			{title}
		</button>
	);
};
