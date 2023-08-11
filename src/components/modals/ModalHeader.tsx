import React, { MouseEvent, MouseEventHandler } from 'react';
import Button from '../Button';

interface IModalHeaderProps {
	title: string;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
	onMouseUp?: () => void;
}

const ModalHeader = ({
	title,
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
			<h2 className="font-bold font-eng">{title}</h2>
			<div className="flex space-x-1">
				<Button
					onClick={onMinimize}
					className=" w-[21px] h-[21px] flex justify-center items-center text-black"
				>
					<i className="mb-1 fa fa-window-minimize"></i>
				</Button>
				<Button
					onClick={(event) => onClose(event)}
					className=" w-[21px] h-[21px] flex justify-center items-center"
				>
					<img src="/icon-x.svg" alt="close" />
				</Button>
			</div>
		</div>
	);
};

export default ModalHeader;
