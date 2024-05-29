// import React from 'react';
import "../Styles/DialogComponent.css";

const DialogComponent = ({ isOpen, onClose, children, title }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className={`overlay ${isOpen ? "open" : ""}`}></div>
			<div className={`dialog ${isOpen ? "dialog--open" : ""}`}>
				<div className="dialogHeader">
					<span style={{ fontWeight: "bold", fontSize: "x-large" }}>
						{title}
					</span>
					<button
						className="close-button"
						onClick={onClose}
					>
						Close
					</button>
				</div>
				<div className="dialog-content">{children}</div>
			</div>
		</>
	);
};

export default DialogComponent;
