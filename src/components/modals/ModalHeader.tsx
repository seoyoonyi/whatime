import React, { MouseEvent } from 'react';
import Button from '../Button';

interface IModalHeaderProps {
	title: string;
	onClose: () => void;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
}

const ModalHeader = ({ title, onClose, onMouseDown, onMouseLeave }: IModalHeaderProps) => {
	return (
		<div
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseLeave}
			className="flex justify-between bg-retroBlue cursor-pointer  py-[3px] px-[6px] text-white"
		>
			<h2 className="font-bold font-eng">{title}</h2>
			<div className="">
				<Button
					onClick={onClose}
					className=" w-[21px] h-[21px] flex justify-center items-center"
				>
					<img src="/icon-x.svg" alt="close" />
				</Button>
			</div>
		</div>
	);
};

export default ModalHeader;
