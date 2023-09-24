import React, { MouseEventHandler, useContext, useRef } from 'react';
import Modal from './Modal';
import { ISong } from '../../types/types';
import { truncateTitle } from '../../utils/ utils';
import Button from '../Button';
import { Drvspace7 } from '@react95/icons';
import Frame from '../Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import MusicContext, { IMusicContext } from '../../contexts/MusicContext';

interface IChartModal {
	open: boolean;
	songs: ISong[];
	style: React.CSSProperties;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onModalClick: MouseEventHandler<HTMLDivElement>;
}

const ChartModal = ({ open, style, onClose, onMinimize, onModalClick, songs }: IChartModal) => {
	const chartModalRef = useRef(null);
	const { handleSongClick } = useContext<IMusicContext>(MusicContext);
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
			<div className="py-2 pl-4 md:py-[5px] md:pl-[6px] flex justify-between">
				<h2 className="text-lg font-bold md:text-xl font-eng">TOP100</h2>
				<p className="flex items-center mt-1 text-xs md:mt-2 md:text-sm">
					<FontAwesomeIcon className="mr-2" icon={faClock} />
					매일 12시 30분에 업데이트됩니다.
				</p>
			</div>
			<Frame className="overflow-y-auto max-h-96" boxShadow="in" bg="white">
				{songs.map((song: ISong, index: number) => (
					<div
						key={song.id}
						className="flex items-center justify-between p-2 border-b border-dashed md:p-4 border-retroGray"
					>
						<div className="flex items-center mr-2">
							<div className="flex items-center font-eng justify-center w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl font-bold text-center leading-[2rem] md:leading-[2.5rem] mr-2 md:mr-3">
								{song.ranking}
							</div>
							<div className="flex space-x-2">
								<div className="flex items-center justify-center w-16 h-8 overflow-hidden md:w-20 md:h-11 bg-retroGray">
									<img
										src={song.thumbnail}
										alt={song.musicTitle}
										className="w-auto"
									/>
								</div>

								<div>
									<h4 className="text-sm md:font-bold">
										{truncateTitle(song.musicTitle)}
									</h4>
									<p className="text-xs">{song.artist}</p>
								</div>
							</div>
						</div>
						<div>
							<Button className="px-2 md:px-3" onClick={() => handleSongClick(index)}>
								<FontAwesomeIcon icon={faPlay} />
							</Button>
							<Button className="px-2 md:px-3">
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
