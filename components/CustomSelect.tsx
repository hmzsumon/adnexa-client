'use client';
import React, { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

type Option = {
	label: string;
	value: string;
};

const CustomSelect: React.FC<{
	options: Option[];
	value: string;
	title: string;
	defaultValue: string;
	onChange: (value: string) => void;
}> = ({ options, value, onChange, title, defaultValue }) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const handleSelect = (option: Option) => {
		onChange(option.value);
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative' ref={selectRef}>
			<div
				className='border border-gray-300 rounded px-2 py-2 w-full flex items-center justify-between cursor-pointer'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className='text-gray-200'>
					{options.find((option) => option.value === value)?.label ||
						defaultValue}
				</span>
				<MdArrowDropDown className=' text-2xl text-gray-200' />{' '}
				{/* Render the down arrow icon */}
			</div>
			{isOpen && (
				<div className='absolute z-10 top-full left-0 w-full border min-h-fit max-h-40 border-gray-300 bg-white rounded mt-1 overflow-auto'>
					<div className='px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-300'>
						<span>{title}</span>
					</div>
					{options.map((option) => (
						<div
							key={option.value}
							className='px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-300'
							onClick={() => handleSelect(option)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
