import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { Keys } from '@react95/icons';
import AuthInput from '../inputs/AuthInput';
import Button from '../buttons/Button';
import { useForm } from 'react-hook-form';
import { signupValidationRules } from '../../utils/validationRules';

interface ISignUpModalProps {
	open: boolean;
	style: React.CSSProperties;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
}

interface IFormData {
	email: string;
	password: string;
	nickname: string;
	confirmPassword: string;
}

// TODO:: 더미 데이터 (실제로는 IndexedDB에서 가져온 데이터나 API 응답을 사용해야 함)
const fakeDB = {
	emails: ['test@email.com', 'example@email.com'],
	nicknames: ['testNickname', 'exampleNickname'],
};

const SignUpModal: React.FC<ISignUpModalProps> = ({
	open,
	style,
	onClose,
	onMinimize,
	onModalClick,
}) => {
	const signUpModalRef = useRef<HTMLDivElement | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [nickname, setNickname] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
	const [passwordSafety, setPasswordSafety] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [nicknameError, setNicknameError] = useState<string | null>(null);

	// TODO:: 더미 데이터 (실제로는 IndexedDB에서 가져온 데이터나 API 응답을 사용해야 함)
	const checkEmailInDB = (email: string) => {
		return fakeDB.emails.includes(email);
	};

	const checkNicknameInDB = (nickname: string) => {
		return fakeDB.nicknames.includes(nickname);
	};

	const checkPasswordMatch = () => {
		setPasswordMismatch(password !== confirmPassword);
	};

	const checkPasswordSafety = () => {
		const hasLowercase = /[a-z]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const hasDigits = /\d/.test(password);
		const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

		if (hasLowercase && hasUppercase && hasDigits && hasSpecialCharacters) {
			setPasswordSafety('high');
		} else if ((hasLowercase || hasUppercase) && hasDigits) {
			setPasswordSafety('medium');
		} else {
			setPasswordSafety('low');
		}
	};

	const onSubmit = useCallback((data: IFormData) => {
		console.log(data);
	}, []);

	useEffect(() => {
		checkPasswordSafety();
		checkPasswordMatch();
	}, [password, confirmPassword]);

	// TODO:: 더미 데이터 (실제로는 IndexedDB에서 가져온 데이터나 API 응답을 사용해야 함)
	useEffect(() => {
		if (checkEmailInDB(email)) {
			setEmailError('This email is already in use.');
		} else {
			setEmailError(null);
		}
	}, [email]);

	useEffect(() => {
		if (checkNicknameInDB(nickname)) {
			setNicknameError('This nickname is already in use.');
		} else {
			setNicknameError(null);
		}
	}, [nickname]);

	return (
		<Modal
			className="absolute"
			open={open}
			onClose={onClose}
			onMinimize={onMinimize}
			onModalClick={onModalClick}
			icon={<Keys className="w-auto" />}
			title="SignUp"
			modalRef={signUpModalRef}
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
							inputProps={register('email', signupValidationRules.email)}
							customOnChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && <p>{errors.email.message}</p>}
						{emailError && <p>{emailError}</p>}

						<AuthInput
							placeholder="password"
							word="password"
							type="password"
							inputProps={register('password', signupValidationRules.password)}
							customOnChange={(e) => setPassword(e.target.value)}
						/>
						{errors.password && <p>{errors.password.message}</p>}
						{password && <p>Password safety: {passwordSafety}</p>}

						<AuthInput
							placeholder="confirm password"
							word="confirm password"
							type="password"
							inputProps={register('confirmPassword')}
							customOnChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{passwordMismatch && <p>Passwords do not match!</p>}

						<AuthInput
							placeholder="nickname"
							word="nickname"
							inputProps={register('nickname', signupValidationRules.nickname)}
							customOnChange={(e) => setNickname(e.target.value)}
						/>
						{errors.nickname && <p>{errors.nickname.message}</p>}
						{nicknameError && <p>{nicknameError}</p>}
					</div>
					<Button
						disabled={
							!email ||
							!password ||
							!nickname ||
							passwordMismatch ||
							passwordSafety === 'low'
						}
					>
						SignUp
					</Button>
				</form>
			</div>
		</Modal>
	);
};

export default SignUpModal;
