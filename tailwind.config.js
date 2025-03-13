/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			white: '#ffffff',
			black: '#000000',
			red: '#FF0000',
			blue: '#3498db',
			green: '#28a745',
			gray: '#a4a8a4',
			retroGray: '#CDCFCD',
			retroLightGray: '#E9ECE9',
			retroBlue: '#00007E',
		},
		fontFamily: {
			eng: ['Roboto', 'sans-serif'],
			kor: ['Pretendard', 'sans-serif'],
		},
		fontWeight: {
			thin: 100,
			extralight: 200,
			light: 300,
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			extrabold: 800,
			black: 900,
		},
		extend: {},
	},
	plugins: [],
};
