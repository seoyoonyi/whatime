import React, { useEffect, useContext } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import Button from '../components/buttons/Button';
import ChartModal from '../components/modals/ChartModal';
import useModal from '../hooks/useModal';
import ModalButton from '../components/buttons/ModalButton';
import axios from 'axios';
import { CdMusic, Keys, Drvspace7 } from '@react95/icons';
import MusicContext, { IMusicContext } from '../contexts/MusicContext';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';
import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../api/api';

import { ISong } from '../types/types';

export type ModalType = 'music' | 'chart' | 'signIn' | 'signUp';

const MainPage = () => {
	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 5 }, 'music');
	const chartModal = useModal(undefined, 'chart');
	const signInModal = useModal(undefined, 'signIn');
	const signUpModal = useModal(undefined, 'signUp');

	const {
		data: fetchedSongs,
		isError,
		error,
		refetch,
	} = useQuery<ISong[], Error>(['songs'], fetchSongs, {
		staleTime: Infinity,
	});

	const { state, dispatch, playerRef, handleReady, handleStateChange } =
		useContext<IMusicContext>(MusicContext);

	const { songs, currentSongIndex } = state;

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
			controls: 0,
		},
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

	useEffect(() => {
		const now = new Date();
		const utcHours = now.getUTCHours();
		const kstHours = (utcHours + 9) % 24;
		const nextUpdate = new Date(
			Date.UTC(
				now.getUTCFullYear(),
				now.getUTCMonth(),
				now.getUTCDate() + (kstHours >= 0 && kstHours < 12 ? 0 : 1),
				3,
				30,
				0,
				0,
			),
		);
		const timeoutId = setTimeout(() => {
			refetch();
		}, nextUpdate.getTime() - now.getTime());
		return () => clearTimeout(timeoutId);
	}, [refetch]);

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
						handleChartModalOpen={chartModal.open}
						handleSignInModalOpen={signInModal.open}
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
						handleSignUpModalOpen={signUpModal.open}
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

			<footer className="flex items-center w-full px-7 h-9 bg-retroGray">
				<div className="relative flex items-center h-full">
					<Button
						onClick={musicModal.open}
						className={`text-[14px] flex items-center justify-center  font-eng mr-2 border-none w-7 h-7 bar`}
					>
						<div className="w-6">
							<CdMusic className="w-auto" />
						</div>
					</Button>
				</div>
				<div className="flex">
					<ModalButton
						modalType="music"
						open={musicModal.modalState.isOpen}
						isMinimized={musicModal.modalState.isMinimized}
						toggleMinimize={musicModal.toggleMinimize}
						icon={<CdMusic className="w-auto" />}
						label="Music"
					/>
					<ModalButton
						modalType="chart"
						open={chartModal.modalState.isOpen}
						isMinimized={chartModal.modalState.isMinimized}
						toggleMinimize={chartModal.toggleMinimize}
						icon={<Drvspace7 className="w-auto" />}
						label="Chart"
					/>
					<ModalButton
						modalType="signIn"
						open={signInModal.modalState.isOpen}
						isMinimized={signInModal.modalState.isMinimized}
						toggleMinimize={signInModal.toggleMinimize}
						icon={<Keys className="w-auto" />}
						label="SignIn"
					/>
				</div>
			</footer>
		</div>
	);
};

export default MainPage;
