import React from 'react';

interface IModalComponentProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: IModalComponentProps) => {
	if (!open) return null;

	return (
		<>
			<div className="w-[600px] border">
				<div className="relative flex justify-center">
					<h1 className="">Music</h1>
					<div className="absolute right-0 icon-group">
						<button onClick={onClose}>
							<i className="fas fa-times-circle"></i>
						</button>
					</div>
				</div>
				{children}
			</div>
		</>
	);
};

export default Modal;
