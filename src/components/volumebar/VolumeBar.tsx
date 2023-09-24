import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import styles from './volumebar.module.css';
import { Mute, Unmute } from '@react95/icons';
import MusicContext, { IMusicContext } from '../../contexts/MusicContext';

const VolumeBar = () => {
	const volumeRef = useRef<HTMLInputElement>(null);
	const [playerReady, setPlayerReady] = useState(false);
	const { state, dispatch, playerRef } = useContext<IMusicContext>(MusicContext);

	const { volume, isMuted } = state;
	const player = playerRef.current;

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const volume = e.target.valueAsNumber;
		dispatch({ type: 'SET_VOLUME', payload: volume * 100 });

		if (player && 'setVolume' in player && playerReady) {
			if (volume <= 0) {
				player.setVolume(0);
				dispatch({ type: 'SET_MUTE', payload: true });
			} else {
				player.setVolume(volume * 100);
				if (isMuted) {
					dispatch({ type: 'SET_MUTE', payload: false });
					player.unMute();
				}
			}
		}
	};

	const toggleMute = () => {
		if (player && playerReady) {
			if (isMuted) {
				player.unMute();
				dispatch({ type: 'SET_MUTE', payload: false });
				dispatch({ type: 'SET_PLAY_BUTTON', payload: false });
				if (volume <= 0) {
					dispatch({ type: 'SET_VOLUME', payload: 100 });
					player.setVolume(100);
				}
			} else {
				player.mute();
				dispatch({ type: 'SET_MUTE', payload: true });
			}
		}
	};

	const renderSoundIcon = () => {
		switch (String(isMuted)) {
			case 'true':
				return <Mute className="w-6 mr-2" />;
			case 'false':
				return <Unmute className="w-6 mr-2" />;
			default:
				return null;
		}
	};

	useEffect(() => {
		if (player) setPlayerReady(true);
	}, [player]);

	return (
		<div className="flex items-center justify-between cursor-pointer">
			<span className="text-[22px] cursor-pointer" onClick={toggleMute}>
				{renderSoundIcon()}
			</span>
			<input
				type="range"
				min="0"
				max="1"
				step="0.1"
				value={isMuted ? 0 : volume / 100}
				className={styles.slider}
				onChange={handleVolumeChange}
				ref={volumeRef}
			/>
		</div>
	);
};

export default VolumeBar;
