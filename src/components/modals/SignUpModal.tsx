import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { Computer } from '@react95/icons';
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
	handleSignInModalOpen: MouseEventHandler<HTMLLIElement>;
}

interface IFormData {
	email: string;
	password: string;
	nickname: string;
	confirmPassword: string;
}

interface IErrorMessages {
	email: string | null;
	password: string | null;
	confirmPassword: string | null;
	nickname: string | null;
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
	handleSignInModalOpen,
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
	const [passwordSafety, setPasswordSafety] = useState<string>('');
	const [errorMessages, setErrorMessages] = useState<IErrorMessages>({
		email: null,
		password: null,
		confirmPassword: null,
		nickname: null,
	});

	// TODO:: 더미 데이터 (실제로는 IndexedDB에서 가져온 데이터나 API 응답을 사용해야 함)
	const checkEmailInDB = (email: string) => {
		return fakeDB.emails.includes(email);
	};

	const checkNicknameInDB = (nickname: string) => {
		return fakeDB.nicknames.includes(nickname);
	};

	const getPasswordStrengthMessage = (safetyLevel: string) => {
		switch (safetyLevel) {
			case 'high':
				return { message: 'Strong password', borderColor: 'border-green' };
			case 'medium':
				return { message: 'Medium strength', borderColor: 'border-blue' };
			case 'low':
				return { message: 'Weak password', borderColor: 'border-red' };
			default:
				return { message: '', borderColor: '' };
		}
	};

	const checkPasswordMatch = () => {
		if (confirmPassword) {
			setErrorMessages((prev) => ({
				...prev,
				confirmPassword: password !== confirmPassword ? 'Passwords do not match!' : null,
			}));
		}
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
		alert('회원가입이 완료되었습니다! 현재 회원가입 기능은 테스트 중입니다.');
	}, []);

	const isSignupDisabled = () => {
		const isEmailValid = !checkEmailInDB(email) && email.length > 0;
		const isPasswordValid = passwordSafety !== 'low' && password.length > 0;
		const isNicknameValid = !checkNicknameInDB(nickname) && nickname.length > 0;
		const isConfirmPasswordValid = confirmPassword === password;

		return !isEmailValid || !isPasswordValid || !isNicknameValid || !isConfirmPasswordValid;
	};

	useEffect(() => {
		if (password.length > 0) {
			checkPasswordSafety();
		} else {
			setPasswordSafety('');
		}
		checkPasswordMatch();
	}, [password, confirmPassword]);

	// TODO:: 더미 데이터 (실제로는 IndexedDB에서 가져온 데이터나 API 응답을 사용해야 함)
	useEffect(() => {
		const passwordStrength = getPasswordStrengthMessage(passwordSafety);

		setErrorMessages((prev) => ({
			...prev,
			email: checkEmailInDB(email) ? 'This email is already in use.' : null,
			nickname: checkNicknameInDB(nickname) ? 'This nickname is already in use.' : null,
			password: password.length > 0 ? passwordStrength.message : null,
		}));
	}, [email, nickname, password, passwordSafety]);

	useEffect(() => {
		const emailError = checkEmailInDB(email) ? 'This email is already in use.' : null;
		const nicknameError = checkNicknameInDB(nickname)
			? 'This nickname is already in use.'
			: null;

		setErrorMessages((prev) => ({
			...prev,
			email: emailError,
			nickname: nicknameError,
		}));
	}, [email, nickname]);

	return (
		<Modal
			className="absolute"
			open={open}
			onClose={onClose}
			onMinimize={onMinimize}
			onModalClick={onModalClick}
			icon={<Computer className="w-auto" />}
			title="SignUp"
			modalRef={signUpModalRef}
			style={style}
		>
			<div className="px-[16px] py-[26px]">
				<h2 className="flex justify-center pb-[26px]">
					<Computer className="w-[66px]" />
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="pb-[26px] w-[250px]">
						<div className="w-full mb-[10px]">
							<AuthInput
								placeholder="email"
								word="email"
								type="email"
								autoFocus={true}
								inputProps={register('email', signupValidationRules.email)}
								customOnChange={(e) => setEmail(e.target.value)}
								error={!!errorMessages.email}
							/>
							{errorMessages.email && (
								<p className="text-xs text-red">{errorMessages.email}</p>
							)}
						</div>
						<div className="w-full mb-[10px]">
							<AuthInput
								placeholder="password"
								word="password"
								type="password"
								className={getPasswordStrengthMessage(passwordSafety).borderColor}
								inputProps={register('password', signupValidationRules.password)}
								customOnChange={(e) => setPassword(e.target.value)}
								error={!!errorMessages.password}
							/>

							{errorMessages.password && (
								<p
									className={`text-xs ${getPasswordStrengthMessage(
										passwordSafety,
									).borderColor.replace('border-', 'text-')}`}
								>
									{errorMessages.password}
								</p>
							)}

							<AuthInput
								placeholder="confirm password"
								type="password"
								inputProps={register('confirmPassword')}
								customOnChange={(e) => setConfirmPassword(e.target.value)}
								error={!!errorMessages.confirmPassword}
							/>
							{errorMessages.confirmPassword && (
								<p className="text-xs text-red">{errorMessages.confirmPassword}</p>
							)}
						</div>

						<div className="w-full">
							<AuthInput
								placeholder="nickname"
								word="nickname"
								inputProps={register('nickname', signupValidationRules.nickname)}
								customOnChange={(e) => setNickname(e.target.value)}
							/>
							{errors.nickname && (
								<p className="text-xs text-red">{errors.nickname.message}</p>
							)}
						</div>
					</div>
					<div className="flex justify-center mb-[7px]">
						<Button disabled={isSignupDisabled()} className="px-[18px] py-[3px] w-full">
							SignUp
						</Button>
					</div>
				</form>
				<div className="flex items-center justify-center">
					<span className="mr-1 text-xs opacity-50">Already have an account?</span>
					<Button
						onClick={handleSignInModalOpen}
						className="text-xs underline border-none opacity-80"
					>
						Sign Up
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default SignUpModal;
