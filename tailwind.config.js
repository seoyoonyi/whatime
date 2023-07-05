/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			tablet: '640px',
			laptop: '1024px',
			desktop: '1280px',
		},
		colors: {
			white: '#ffffff',
			black: '#000000',
			retroGray: '#CDCFCD',
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
