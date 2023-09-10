import React, { MouseEvent, MouseEventHandler } from 'react';
import Button from '../Button';
import { faClose, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IModalHeaderProps {
	title: string;
	icon?: React.ReactElement;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
	onMouseUp?: () => void;
}

const ModalHeader = ({
	title,
	icon,
	onMinimize,
	onClose,
	onMouseDown,
	onMouseLeave,
	onMouseMove,
	onMouseUp,
}: IModalHeaderProps) => {
	return (
		<div
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			className="flex justify-between bg-retroBlue py-[3px] px-[6px] text-white"
		>
			<div className="flex">
				<div className="w-5 mr-1">{icon}</div>
				<h2 className="font-bold font-eng">{title}</h2>
			</div>

			<div className="flex">
				<Button
					onClick={onMinimize}
					className=" w-[21px] h-[21px] flex items-center justify-center text-black "
				>
					<FontAwesomeIcon className="mb-[2px]" icon={faWindowMinimize} />
				</Button>
				<Button
					onClick={(event) => onClose(event)}
					className="w-[21px] h-[21px] flex items-center justify-center  text-black"
				>
					<FontAwesomeIcon icon={faClose} />
				</Button>
			</div>
		</div>
	);
};

export default ModalHeader;
