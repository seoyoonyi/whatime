import React from 'react';
import Button from '../Button';

interface IModalHeaderProps {
	title: string;
	onClose: () => void;
}

const ModalHeader = ({ title, onClose }: IModalHeaderProps) => {
	return (
		<div className="flex justify-between bg-retroBlue  py-[3px] px-[6px] text-white">
			<h2 className="font-bold font-eng">{title}</h2>
			<div className="">
				{/* w-[21px] h-[21px] flex justify-center items-center */}
				<Button
					onClick={onClose}
					className=" w-[21px] h-[21px] flex justify-center items-center"
				>
					<img src="/icon-x.svg" />
				</Button>
			</div>
		</div>
	);
};

export default ModalHeader;
