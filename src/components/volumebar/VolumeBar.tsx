import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './volumebar.module.css';
import { IPlayer } from '../types/types';

interface IVolumeBarProps {
	player: IPlayer | null;
	volume: number;
	setVolume: React.Dispatch<React.SetStateAction<number>>;
	isMuted: boolean;
	setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const VolumeBar = ({ player, volume, setVolume, setIsMuted, isMuted }: IVolumeBarProps) => {
	const volumeRef = useRef<HTMLInputElement>(null);
	const [playerReady, setPlayerReady] = useState(false);

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const volume = e.target.valueAsNumber;
		setVolume(volume * 100);

		if (player && 'setVolume' in player && playerReady) {
			if (volume <= 0) {
				player.setVolume(0);
				setIsMuted(true);
			} else {
				player.setVolume(volume * 100);
				if (isMuted) {
					setIsMuted(false);
					player.unMute();
				}
			}
		}
	};

	const toggleMute = () => {
		if (player && playerReady) {
			if (isMuted) {
				player.unMute();
				setIsMuted(false);
				if (volume <= 0) {
					setVolume(100);
					player.setVolume(100);
				}
			} else {
				player.mute();
				setIsMuted(true);
			}
		}
	};

	useEffect(() => {
		if (player) setPlayerReady(true);
	}, [player]);

	return (
		<div className="flex items-center justify-between cursor-pointer">
			<span className="text-[22px] cursor-pointer" onClick={toggleMute}>
				{isMuted ? '🔇' : '🔈'}
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
