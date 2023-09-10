import React, { MouseEventHandler, useRef } from 'react';
import Modal from './Modal';
import { ISong } from '../../types/types';
import { truncateTitle } from '../../utils/ utils';
import Button from '../Button';
import { Drvspace7 } from '@react95/icons';
import Frame from '../Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

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
			className="absolute"
			open={open}
			onClose={onClose}
			onMinimize={onMinimize}
			onModalClick={onModalClick}
			icon={<Drvspace7 className="w-auto" />}
			title="Music"
			modalRef={chartModalRef}
			style={style}
		>
			<div className="py-[5px] pl-[6px] flex justify-between">
				<h2 className="text-xl font-bold font-eng">TOP100</h2>
				<p className="flex items-center mt-2 text-sm">
					<FontAwesomeIcon className="mr-2" icon={faClock} />
					매일 12시 30분에 업데이트됩니다.
				</p>
			</div>
			<Frame className="overflow-y-auto max-h-96" boxShadow="in" bg="white">
				{songs.map((song: ISong, index: number) => (
					<div
						key={song.id}
						className="flex items-center justify-between p-4 border-b border-dashed border-retroGray"
					>
						<div className="flex items-center mr-2">
							<div className="flex items-center font-eng justify-center w-10 h-10 text-xl font-bold text-center leading-[2.5rem] mr-3">
								{song.ranking}
							</div>
							<div className="flex space-x-2">
								<div className="flex items-center justify-center w-20 overflow-hidden h-11 bg-retroGray">
									<img
										src={song.thumbnail}
										alt={song.musicTitle}
										className="w-auto"
									/>
								</div>

								<div>
									<h4 className="font-bold">{truncateTitle(song.musicTitle)}</h4>
									<p className="text-sm">{song.artist}</p>
								</div>
							</div>
						</div>
						<div>
							<Button className="px-3" onClick={() => onSongClick(index)}>
								<FontAwesomeIcon icon={faPlay} />
							</Button>
							<Button className="px-3">
								<FontAwesomeIcon icon={faPlus} />
							</Button>
						</div>
					</div>
				))}
			</Frame>
		</Modal>
	);
};

export default ChartModal;
