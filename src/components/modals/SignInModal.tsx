import React, { MouseEventHandler, useRef } from 'react';
import Modal from './Modal';
import { Keys } from '@react95/icons';
import AuthInput from '../inputs/AuthInput';

interface ISignInModalProps {
	open: boolean;
	style: React.CSSProperties;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
}

const SignInModal = ({ open, style, onClose, onMinimize, onModalClick }: ISignInModalProps) => {
	const signInModalRef = useRef(null);

	return (
		<Modal
			className="absolute"
			open={open}
			onClose={onClose}
			onMinimize={onMinimize}
			onModalClick={onModalClick}
			icon={<Keys className="w-auto" />}
			title="SignIn"
			modalRef={signInModalRef}
			style={style}
		>
			<div>
				<h2>
					<Keys />
				</h2>
				<div>
					<AuthInput placeholder="email" word="email" />
					<AuthInput placeholder="password" word="password" />
				</div>
			</div>
		</Modal>
	);
};

export default SignInModal;
