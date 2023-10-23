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
			title="Sign In"
			modalRef={signInModalRef}
			style={style}
		>
			<div className="px-[35px] py-[30px]">
				<h2 className="flex justify-center pb-[25px]">
					<Keys className="w-[77px]" />
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="pb-[35px] w-[250px]">
						<div className="mb-[28px] w-full">
							<AuthInput
								placeholder="email"
								word="email"
								type="email"
								autoFocus={true}
								inputProps={register('email', signinValidationRules.email)}
								customOnChange={(e) => setEmail(e.target.value)}
								className="w-full mb-1"
								error={!!errors.email}
							/>

							{errors.email && (
								<p className="text-xs text-red">{errors.email.message}</p>
							)}
						</div>

						<div className="w-full">
							<AuthInput
								placeholder="password"
								word="password"
								type="password"
								inputProps={register('password', signinValidationRules.password)}
								customOnChange={(e) => setPassword(e.target.value)}
								className="w-full mb-1"
								error={!!errors.password}
							/>

							{errors.password && (
								<p className="text-xs text-red">{errors.password.message}</p>
							)}
						</div>
					</div>
					<div className="flex justify-center mb-[10px]">
						<Button disabled={!email || !password} className="px-[18px] py-[3px]">
							Sign In
						</Button>
					</div>
				</form>
				<div className="flex justify-center mb-[10px]">
					<Button
						onClick={handleSignUpModalOpen}
						className="text-sm underline border-none opacity-50"
					>
						Sign Up
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default SignInModal;
