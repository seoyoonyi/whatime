import { lazy } from 'react';
import { CdMusic, Drvspace7, Computer, Keys } from '@react95/icons';

export const MODAL_CONFIGS = {
	music: {
		component: lazy(() => import('../components/modals/MusicModal')),
		icon: CdMusic,
		label: 'Music',
		key: 'music',
	},
	chart: {
		component: lazy(() => import('../components/modals/ChartModal')),
		icon: Drvspace7,
		label: 'Chart',
		key: 'chart',
	},
	signIn: {
		component: lazy(() => import('../components/modals/SignInModal')),
		icon: Keys,
		label: 'SignIn',
		key: 'signIn',
	},
	signUp: {
		component: lazy(() => import('../components/modals/SignUpModal')),
		icon: Computer,
		label: 'SignUp',
		key: 'signUp',
	},
	addSong: {
		component: lazy(() => import('../components/modals/AddSongModal')),
		key: 'addSong',
	},
	loading: {
		component: lazy(() => import('../components/modals/LoadingModal')),
		key: 'loading',
	},
};
