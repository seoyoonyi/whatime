import React, { MouseEventHandler, useRef } from 'react';
import Modal from './Modal';
import { IPlayer, ISong } from '../../types/types';
import { formatDate, handleImageError, truncateTitle } from '../../utils/utils';
import Button from '../buttons/Button';
import { Drvspace7 } from '@react95/icons';
import Frame from '../Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../../api/api';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import { MODAL_KEYS } from '../../configs/modalKeys';
import { ModalType } from '../../types/modalTypes';

interface IChartModal {
	open: boolean;
	style: React.CSSProperties;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onOpen: MouseEventHandler<HTMLDivElement>;
	playerRef: React.MutableRefObject<IPlayer | null>;
}

const ChartModal = ({ open, style, onClose, onMinimize, onOpen, playerRef }: IChartModal) => {
	const chartModalRef = useRef(null);

	const { handleSongClick } = useMusicPlayer({ playerRef });

	const {
		data: songs,
		isError,
		error,
	} = useQuery<ISong[], Error>(['songs'], fetchSongs, {
		staleTime: Infinity,
	});

	if (isError) {
		console.error('Failed to fetch songs using React Query', error);
	}

	return (
		<>
			<Modal
				className="absolute"
				open={open}
				onClose={onClose}
				onMinimize={onMinimize}
				onOpen={onOpen}
				icon={<Drvspace7 className="w-auto" />}
				title="Chart"
				modalRef={chartModalRef}
				style={style}
				modalKey={MODAL_KEYS.CHART as ModalType}
			>
				<div className="flex items-center justify-between px-1 py-2">
					<div className="flex items-center">
						<h2 className="text-lg font-bold lg:text-xl font-eng">TOP100</h2>
						<span className="mt-1 ml-1 text-xs">
							{formatDate(songs?.[0]?.rankDate)}
						</span>
					</div>
					<p className="flex items-center mt-1 text-xs">
						<FontAwesomeIcon className="mr-2" icon={faClock} />
						매일 12시 00분에 업데이트됩니다.
					</p>
				</div>
				<Frame className="overflow-y-auto max-h-96" boxShadow="in" bg="white">
					{songs?.map((song: ISong, index: number) => (
						<div
							key={song.ranking}
							className="flex items-center justify-between p-2 border-b border-dashed xl:p-4 border-retroGray"
						>
							<div className="flex items-center mr-3 xl:mr-4">
								<div className="flex items-center font-eng justify-center w-8 h-8text-lg xl:text-xl font-bold text-center leading-[2rem] xl:leading-[2.5rem] mr-2 xl:mr-4">
									{song.ranking}
								</div>
								<div className="flex items-center space-x-2">
									<div className="flex items-center justify-center w-16 h-8 overflow-hidden xl:w-20 xl:h-11 bg-retroGray">
										<img
											src={song.thumbnail}
											onError={handleImageError}
											alt={song.musicTitle}
											className="w-auto"
										/>
									</div>

									<div>
										<h4 className="font-bold">
											{truncateTitle(song.musicTitle)}
										</h4>
										<p className="text-xs xl:text-sm">{song.artist}</p>
									</div>
								</div>
							</div>
							<div>
								<Button
									className="px-2 xl:px-3"
									onClick={() => handleSongClick(index)}
								>
									<FontAwesomeIcon icon={faPlay} />
								</Button>
								<Button className="px-2 xl:px-3">
									<FontAwesomeIcon icon={faPlus} />
								</Button>
							</div>
						</div>
					))}
				</Frame>
			</Modal>
		</>
	);
};

export default React.memo(ChartModal);
