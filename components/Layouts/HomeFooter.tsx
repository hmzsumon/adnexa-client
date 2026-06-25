'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdSense from '../AdSense';

const HomeFooter = () => {
	const handleDownload = () => {
		// Trigger download action
		const link = document.createElement('a');
		link.href = '/click-by-cash.apk';
		link.download = 'click-by-cash.apk';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleDownloadPDF = () => {
		// Trigger download action for PDF
		const link = document.createElement('a');
		link.href = '/clickbycash.pdf';
		link.download = 'clickbycash.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className=' pt-10 bg-cbc-black text-white pb-4 w-full z-10  px-4'>
			<div className=' md:w-11/12 w-full mx-auto'>
				<div className=' grid md:grid-cols-4 gap-2'>
					<div>
						<Image
							src='/logo_2.png'
							alt='IC market Logo'
							width={300}
							height={100}
							className='object-contain w-16 h-auto my-4'
						/>
						<p className=' text-xs text-[#777777] leading-4 tracking-tight text-justify'>
							Quick Earning is an innovative online earning platform that allows
							users to make money by simply viewing advertisements. Our mission
							is to provide a user-friendly and efficient way for individuals to
							earn extra income from the comfort of their own home.
						</p>
					</div>
				</div>
				<div>
					<hr className='border-t border-gray-700 my-6 w-full' />
					<div className=' grid md:grid-cols-2 gap-4'>
						<button
							className='px-4 py-2  text-gray-100 bg-[#aa72ce]  rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleDownload}
							disabled={true}
						>
							Download App For Android
						</button>
						<button
							className='px-4 py-2  text-gray-100 bg-[#227f9e] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleDownloadPDF}
							disabled={true}
						>
							Download Business Plan
						</button>
					</div>
				</div>
				<hr className='border-t border-gray-700 mt-6 mb-2 w-full' />

				<div>
					<p className='text-xs text-gray-100 text-center md:text-left mt-2'>
						&copy; Quick Earning | All rights reserved
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomeFooter;
