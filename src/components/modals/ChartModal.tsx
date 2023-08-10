import React, { MouseEventHandler, useRef } from 'react';
import Modal from './Modal';

interface IChartModal {
	open: boolean;
	style: React.CSSProperties;
	onClose: MouseEventHandler<HTMLDivElement>;
	onMinimize: MouseEventHandler<HTMLDivElement>;
	onModalClick: MouseEventHandler<HTMLDivElement>;
}

const ChartModal = ({ open, style, onClose, onMinimize, onModalClick }: IChartModal) => {
	const chartModalRef = useRef(null);
	return (
		<Modal
			className="absolute"
			open={open}
			onClose={onClose}
			onMinimize={onMinimize}
			onModalClick={onModalClick}
			title="📊 Chart"
			ref={chartModalRef}
			style={style}
		>
			ChartModal
		</Modal>
	);
};

export default ChartModal;
