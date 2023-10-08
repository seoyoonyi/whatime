import React, { MouseEventHandler, useRef, useState } from 'react';
import Modal from './Modal';
import { Keys } from '@react95/icons';
import AuthInput from '../inputs/AuthInput';
import Button from '../buttons/Button';
import { useForm } from 'react-hook-form';
import { signinValidationRules } from '../../utils/validationRules';

interface ISignInModalProps {
	open: boolean;
	style: React.CSSProperties;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	handleSignUpModalOpen: MouseEventHandler<HTMLLIElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
}

interface IFormData {
	email: string;
	password: string;
}

const SignInModal = ({
	open,
	style,
	onClose,
	onMinimize,
	onModalClick,
	handleSignUpModalOpen,
}: ISignInModalProps) => {
	const signInModalRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (data: IFormData) => {
		console.log(data);
	};

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
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<AuthInput
							placeholder="email"
							word="email"
							autoFocus={true}
							inputProps={register('email', signinValidationRules.email)}
							customOnChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && <p>{errors.email.message}</p>}

						<AuthInput
							placeholder="password"
							word="password"
							inputProps={register('password', signinValidationRules.password)}
							customOnChange={(e) => setPassword(e.target.value)}
						/>
						{errors.password && <p>{errors.password.message}</p>}
					</div>
					<Button disabled={!email || !password}>Login</Button>
				</form>
				<Button onClick={handleSignUpModalOpen} className="mt-10">
					Sign Up
				</Button>
			</div>
		</Modal>
	);
};

export default SignInModal;
