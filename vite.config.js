import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
	return {
		base: './',
		// https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
		define: {
			'process.env': {},
		},
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
		build: {
			outDir: 'build',
		},
		plugins: [react()],
	};
});
