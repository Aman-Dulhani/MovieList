// import React from 'react';
import "../Styles/DialogComponent.css";

const DialogComponent = ({
	isOpen,
	onClose,
	children,
	title,
	dialogActions,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className={`overlay ${isOpen ? "open" : ""}`}></div>
			<div className={`dialog ${isOpen ? "dialog--open" : ""}`}>
				<div className="dialog-header">
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
				{dialogActions ? (
					<div className="dialog-footer">{dialogActions}</div>
				) : null}
			</div>
		</>
	);
};

export default DialogComponent;
