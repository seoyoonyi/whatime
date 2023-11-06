import React, { useEffect, useContext, MouseEvent } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import Button from '../components/buttons/Button';
import ChartModal from '../components/modals/ChartModal';
import useModal from '../hooks/useModal';
import ModalButton from '../components/buttons/ModalButton';
import { CdMusic, Keys, Drvspace7, Computer } from '@react95/icons';
import MusicContext, { IMusicContext } from '../contexts/MusicContext';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';
import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../api/api';

import { ISong } from '../types/types';
import ModalContext from '../contexts/ModalContext';
import { getRefetchInterval } from '../utils/utils';

export type ModalType = 'music' | 'chart' | 'signIn' | 'signUp';

const MainPage = () => {
	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 5 }, 'music');
	const chartModal = useModal(undefined, 'chart');
	const signInModal = useModal(undefined, 'signIn');
	const signUpModal = useModal(undefined, 'signUp');

	const { data: fetchedSongs } = useQuery<ISong[], Error>(['songs'], fetchSongs, {
		staleTime: Infinity,
		refetchInterval: getRefetchInterval(),
	});

	const { state, dispatch, playerRef, handleReady, handleStateChange } =
		useContext<IMusicContext>(MusicContext);
	const { openedModals } = useContext(ModalContext);
	const { songs, currentSongIndex } = state;

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
			controls: 0,
		},
	};

	const getModalInfo = (modalType: ModalType) => {
		switch (modalType) {
			case 'music':
				return {
					isOpen: musicModal.modalState.isOpen,
					isMinimized: musicModal.modalState.isMinimized,
					toggleMinimize: musicModal.toggleMinimize,
					icon: <CdMusic className="w-auto" />,
					label: 'Music',
					onModalClick: musicModal.open,
				};
			case 'chart':
				return {
					isOpen: chartModal.modalState.isOpen,
					isMinimized: chartModal.modalState.isMinimized,
					toggleMinimize: chartModal.toggleMinimize,
					icon: <Drvspace7 className="w-auto" />,
					label: 'Chart',
					onModalClick: chartModal.open,
				};
			case 'signIn':
				return {
					isOpen: signInModal.modalState.isOpen,
					isMinimized: signInModal.modalState.isMinimized,
					toggleMinimize: signInModal.toggleMinimize,
					icon: <Keys className="w-auto" />,
					label: 'SignIn',
					onModalClick: signInModal.open,
				};
			case 'signUp':
				return {
					isOpen: signUpModal.modalState.isOpen,
					isMinimized: signUpModal.modalState.isMinimized,
					toggleMinimize: signUpModal.toggleMinimize,
					icon: <Computer className="w-auto" />,
					label: 'SignUp',
					onModalClick: signUpModal.open,
				};
			default:
				throw new Error('Unknown modal type: ' + modalType);
		}
	};

	const handleSignUpModalOpen = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
		event.stopPropagation();
		signInModal.close(event);
		signUpModal.open(event);
	};

	useEffect(() => {
		if (fetchedSongs) {
			dispatch({ type: 'SET_SONGS', payload: fetchedSongs });
		}
	}, [dispatch, fetchedSongs]);

	useEffect(() => {
		dispatch({ type: 'SET_PREV_DISABLED', payload: false });
		dispatch({ type: 'SET_NEXT_DISABLED', payload: false });

		const timer = setInterval(() => {
			if (playerRef.current) {
				const newCurrentTime = Math.round(playerRef.current.getCurrentTime());
				dispatch({ type: 'SET_CURRENT_TIME', payload: newCurrentTime });
			}
		}, 1000);

		return () => {
			if (playerRef.current) {
				playerRef.current.stopVideo();
				playerRef.current = null;
			}
			clearInterval(timer);
		};
	}, [dispatch, playerRef]);

	return (
		<div className="flex flex-col w-full h-screen bg-black ">
			<main className="relative flex items-center justify-center w-full h-full">
				{musicModal.modalState.isOpen && (
					<MusicModal
						open={musicModal.modalState.isOpen}
						style={{
							zIndex: musicModal.modalState.zIndex,
							display: musicModal.modalState.isMinimized ? 'none' : undefined,
						}}
						onModalClick={musicModal.open}
						onClose={musicModal.close}
						onMinimize={musicModal.toggleMinimize}
						openChartModal={chartModal.open}
						openSignInModal={signInModal.open}
						currentSongIndex={currentSongIndex}
						songs={songs}
						playerRef={playerRef}
					/>
				)}
				{chartModal.modalState.isOpen && (
					<ChartModal
						open={chartModal.modalState.isOpen}
						onModalClick={chartModal.open}
						onClose={chartModal.close}
						onMinimize={chartModal.toggleMinimize}
						style={{
							zIndex: chartModal.modalState.zIndex,
							display: chartModal.modalState.isMinimized ? 'none' : undefined,
						}}
					/>
				)}
				{signInModal.modalState.isOpen && (
					<SignInModal
						open={signInModal.modalState.isOpen}
						style={{
							zIndex: signInModal.modalState.zIndex,
							display: signInModal.modalState.isMinimized ? 'none' : undefined,
						}}
						onModalClick={signInModal.open}
						handleSignUpModalOpen={handleSignUpModalOpen}
						onClose={signInModal.close}
						onMinimize={signInModal.toggleMinimize}
					/>
				)}

				{signUpModal.modalState.isOpen && (
					<SignUpModal
						open={signUpModal.modalState.isOpen}
						style={{
							zIndex: signUpModal.modalState.zIndex,
							display: signUpModal.modalState.isMinimized ? 'none' : undefined,
						}}
						onModalClick={signUpModal.open}
						onClose={signUpModal.close}
						onMinimize={signUpModal.toggleMinimize}
						handleSignInModalOpen={signInModal.open}
					/>
				)}
				<YouTube
					iframeClassName="w-full h-full flex-grow"
					className="w-full h-full pointer-events-none"
					videoId={new URL(currentSong.url).searchParams.get('v') || ''}
					opts={opts}
					onReady={handleReady}
					onStateChange={handleStateChange}
				/>
			</main>

			<footer className="flex items-center w-full h-10 px-7 bg-retroGray">
				<div className="relative flex items-center h-full">
					<Button
						onClick={musicModal.open}
						className={`text-[14px] flex items-center justify-center  font-eng mr-4 border-none w-7 h-7 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-2 after:w-[3px]  after:h-7 after:bg-retroGray after:border  after:border-b-black after:border-r-black after:border-l-white after:border-t-white`}
					>
						<div className="w-6">
							<CdMusic className="w-auto" />
						</div>
					</Button>
				</div>
				<div className="flex">
					{openedModals.map((modalType) => {
						const modalInfo = getModalInfo(modalType);

						return (
							<ModalButton
								key={modalType}
								modalType={modalType}
								open={modalInfo.isOpen}
								isMinimized={modalInfo.isMinimized}
								toggleMinimize={modalInfo.toggleMinimize}
								icon={modalInfo.icon}
								label={modalInfo.label}
								onModalClick={modalInfo.onModalClick}
							/>
						);
					})}
				</div>
			</footer>
		</div>
	);
};

export default MainPage;
