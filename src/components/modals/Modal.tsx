import React from 'react';
import styles from './Modal.module.css';

interface IModalComponentProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: IModalComponentProps) => {
	if (!open) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<button className={styles.closeButton} onClick={onClose}>
					Close
				</button>
				{children}
			</div>
			<h1></h1>
		</div>
	);
};

export default Modal;
