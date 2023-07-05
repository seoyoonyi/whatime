import React from 'react';
import styles from './volumebar.module.css';

const VolumeBar = () => {
	return (
		<div className="flex items-center justify-between">
			<span className="text-[22px]">🔈</span>
			<input type="range" min="0" max="1" step="0.1" className={styles.slider} />
		</div>
	);
};

export default VolumeBar;
