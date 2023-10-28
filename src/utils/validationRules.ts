interface IValidationRule {
	required: string;
	maxLength?: {
		value: number;
		message: string;
	};
	pattern?: {
		value: RegExp;
		message: string;
	};
	minLength?: {
		value: number;
		message: string;
	};
}

export const signupValidationRules: { [key: string]: IValidationRule } = {
	email: {
		required: 'Email is required',
		maxLength: {
			value: 50,
			message: 'Email should be less than 50 characters',
		},
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			message: 'Invalid email address',
		},
	},
	password: {
		required: 'Password is required',
		minLength: {
			value: 8,
			message: 'Password should be at least 8 characters',
		},
		maxLength: {
			value: 15,
			message: 'Password should be less than 15 characters',
		},
	},
	confirmPassword: {
		required: 'Confirm Password is required',
	},
	nickname: {
		required: 'Nickname is required',
		minLength: {
			value: 1,
			message: 'Nickname should be at least 1 character',
		},
		maxLength: {
			value: 15,
			message: 'Nickname should be less than 15 characters',
		},
		pattern: {
			value: /^[A-Za-z가-힣\s]{1,15}$/,
			message:
				'Nickname should contain only English and Korean characters without leading or trailing spaces',
		},
	},
};

export const signinValidationRules = {
	email: {
		required: 'Email is required',
		maxLength: {
			value: 50,
			message: 'Email should be less than 50 characters',
		},
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			message: 'invalid email address',
		},
	},
	password: {
		required: 'Password is required',
		minLength: {
			value: 8,
			message: 'Password should be at least 8 characters',
		},
		maxLength: {
			value: 15,
			message: 'Password should be less than 15 characters',
		},
	},
};
