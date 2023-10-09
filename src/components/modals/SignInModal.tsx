import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
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

	const onSubmit = useCallback((data: IFormData) => {
		// TODO:: 더미 데이터 (실제로는 IndexedDB에서 가져온 데이터나 API 응답을 사용해야 함)
		const dummyUsers = [{ email: 'test@example.com', password: 'Test1234!' }];

		const isValidUser = dummyUsers.some(
			(user) => user.email === data.email && user.password === data.password,
		);

		if (!isValidUser) {
			alert('아이디/비밀번호를 확인해주세요.');
			return;
		}

		console.log(data);
	}, []);

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
							type="email"
							autoFocus={true}
							inputProps={register('email', signinValidationRules.email)}
							customOnChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && <p>{errors.email.message}</p>}

						<AuthInput
							placeholder="password"
							word="password"
							type="password"
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
