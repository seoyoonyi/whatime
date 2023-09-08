import React, { MouseEventHandler, useRef } from 'react';
import Modal from './Modal';
import { ISong } from '../../types/types';
import { truncateTitle } from '../../utils/ utils';
import Button from '../Button';

interface IChartModal {
	open: boolean;
	songs: ISong[];
	style: React.CSSProperties;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	onSongClick: (index: number) => void;
}

const ChartModal = ({
	open,
	style,
	onClose,
	onMinimize,
	onModalClick,
	onSongClick,
	songs,
}: IChartModal) => {
	const chartModalRef = useRef(null);
	return (
		<Modal
			className="absolute "
			open={open}
			onClose={onClose}
			onMinimize={onMinimize}
			onModalClick={onModalClick}
			title="📊 Chart"
			ref={chartModalRef}
			style={style}
		>
			<div className="py-[5px] pl-[6px] flex justify-between">
				<h2 className="text-xl font-bold">TOP100</h2>
				<p className="flex items-center mt-2 text-sm">
					<i className="mr-2 fas fa-clock"></i>
					매일 12시에 업데이트됩니다.
				</p>
			</div>
			<div className="overflow-y-auto bg-white max-h-96 insetBorderStyle">
				{songs.map((song: ISong, index: number) => (
					<div
						key={song.id}
						className="flex items-center justify-between p-4 border-b border-dashed border-retroGray"
						onClick={() => onSongClick(index)}
					>
						<div className="flex items-center mr-4 space-x-4">
							<span className="">{song.ranking}</span>
							<div className="flex items-center justify-center w-20 overflow-hidden h-11 bg-retroBlue">
								<img
									src={song.thumbnail}
									alt={song.musicTitle}
									className="w-auto"
								/>
							</div>

							<div className="">
								<h4 className="font-bold">{truncateTitle(song.musicTitle)}</h4>
								<p className="text-sm">{song.artist}</p>
							</div>
						</div>
						<div>
							<Button className="px-4">
								<i className="fa fa-heart"></i>
							</Button>
						</div>
					</div>
				))}
			</div>
		</Modal>
	);
};

export default ChartModal;
