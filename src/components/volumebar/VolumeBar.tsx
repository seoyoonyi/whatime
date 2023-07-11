import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './volumebar.module.css';
import { IPlayer } from '../types/types';

interface IVolumeBarProps {
	player: IPlayer | null;
}

const VolumeBar = ({ player }: IVolumeBarProps) => {
	const volumeRef = useRef<HTMLInputElement>(null);
	const [volume, setVolume] = useState(1);
	const [playerReady, setPlayerReady] = useState(false);

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const volume = e.target.valueAsNumber;
		setVolume(volume);

		if (player && 'setVolume' in player && playerReady) {
			if (volume <= 0) {
				player.setVolume(0);
			} else if (volume >= 1) {
				player.setVolume(100);
			} else {
				player.setVolume(volume * 100);
			}
		}
	};

	useEffect(() => {
		if (player) setPlayerReady(true);
	}, [player]);

	return (
		<div className="flex items-center justify-between">
			<span className="text-[22px]">🔈</span>
			<input
				type="range"
				min="0"
				max="1"
				step="0.1"
				value={volume}
				className={styles.slider}
				onChange={handleVolumeChange}
				ref={volumeRef}
			/>
		</div>
	);
};

export default VolumeBar;
