import React from 'react';
import { FaAngleRight, FaCheckCircle, FaCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Stepper = () => {
	const { steppers } = useSelector((state: any) => state.stepper);

	return (
		<div className=' '>
			<ol className='flex items-center w-full mb-4 sm:mb-5'>
				{steppers.map((step: any) => (
					<li
						key={step.id}
						className={`flex w-full items-center after:content-[''] after:w-full  after:h-0.5 after:border-b ${
							step.active ? 'after:border-icm-green' : 'after:border-gray-100'
						}  after:border-1 after:inline-block`}
					>
						<div
							className={`flex items-center justify-center w-10 h-10 ${
								step.active ? 'bg-icm-green' : 'bg-gray-100'
							} rounded-full  dark:bg-blue-800 shrink-0`}
						>
							{step.completed ? (
								<FaCheckCircle className='text-gray-800 ' />
							) : (
								<span className='text-gray-800'>{step.number}</span>
							)}
						</div>
					</li>
				))}
				<li className='flex items-center w-full'>
					<div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0'>
						<FaAngleRight className='text-blue-600 dark:text-blue-500' />
					</div>
				</li>
			</ol>
		</div>
	);
};

export default Stepper;
