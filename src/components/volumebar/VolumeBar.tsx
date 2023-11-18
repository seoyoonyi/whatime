import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './volumebar.module.css';
import { Mute, Unmute } from '@react95/icons';
import { useMusicStore } from '../../stores/useMusicStore';
import { IPlayer } from '../../types/types';
interface IVolumeBar {
	playerRef: React.MutableRefObject<IPlayer | null>;
}

const VolumeBar = ({ playerRef }: IVolumeBar) => {
	const volumeRef = useRef<HTMLInputElement>(null);
	const [playerReady, setPlayerReady] = useState(false);

	const {
		volume,
		isMuted,
		isPlaying,
		isFirstPlay,
		setVolume,
		setMute,
		setPlayButton,
		setFirstPlay,
	} = useMusicStore((state) => ({
		volume: state.volume,
		isMuted: state.isMuted,
		isPlaying: state.isPlaying,
		isFirstPlay: state.isFirstPlay,
		setVolume: state.setVolume,
		setMute: state.setMute,
		setPlayButton: state.setPlayButton,
		setFirstPlay: state.setFirstPlay,
	}));

	const player = playerRef.current;

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const volume = e.target.valueAsNumber;

		setVolume(volume * 100);

		if (player && 'setVolume' in player && playerReady) {
			if (volume <= 0) {
				player.setVolume(0);
				setMute(true);
			} else {
				player.setVolume(volume * 100);
				if (isMuted) {
					setMute(false);
					player.unMute();
				}
			}
		}
	};

	const toggleMute = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		if (player && playerReady) {
			if (isMuted) {
				player.unMute();
				setMute(false);

				if (isFirstPlay && isPlaying) {
					setPlayButton(false);
					setFirstPlay(false);
				}

				if (volume <= 0) {
					setVolume(100);
					player.setVolume(100);
				}
			} else {
				player.mute();
				setMute(true);
			}
		}
	};

	useEffect(() => {
		if (player) setPlayerReady(true);
	}, [player]);

	return (
		<div className="flex items-center justify-between cursor-pointer">
			<span className="text-[22px] cursor-pointer" onClick={toggleMute}>
				{isMuted ? <Mute className="w-6 mr-2" /> : <Unmute className="w-6 mr-2" />}
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
