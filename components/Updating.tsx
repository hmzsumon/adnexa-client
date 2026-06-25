'use client';
import React from 'react';
import Image from 'next/image';
import UpdateImg from '@/public/updating-mg.webp';

const Updating = () => {
	return (
		<div className=' h-screen flex flex-col justify-center items-center'>
			<div className='text-center text-gray-100 mb-4'>
				<h1 className=' text-2xl font-bold '>Updating...</h1>
				<p>We will be back very soon.</p>
			</div>
			<div>
				<Image src={UpdateImg} alt='updating' />
			</div>
		</div>
	);
};

export default Updating;
