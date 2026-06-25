'use client';
import { Button, Card } from 'flowbite-react';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { setActiveStep } from '@/redux/stepperSlice';
import { useDispatch } from 'react-redux';

const RegistrationSuccess = () => {
	const dispatch = useDispatch();
	// Set active step on component mount
	useEffect(() => {
		dispatch(setActiveStep(6));
	}, [dispatch]);

	return (
		<div className=' my-10'>
			<Card className='w-[23rem]'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='w-16 h-16 text-green-500 mx-auto mb-4'
				>
					<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
					<polyline points='22 4 12 14.01 9 11.01'></polyline>
				</svg>
				<h1 className='text-2xl font-semibold mb-2'>
					Registration Successful!
				</h1>
				<p className='text-gray-600 mb-4'>Your account has been created.</p>
				<Link href='/'>
					<Button className='w-full bg-icm-green hover:bg-green-500 text-gray-800 font-semibold'>
						Login
					</Button>
				</Link>
			</Card>
		</div>
	);
};

export default RegistrationSuccess;
