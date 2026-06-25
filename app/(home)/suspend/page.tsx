import Image from 'next/image';
import React from 'react';

const Suspend = () => {
	return (
		<div className='text-center p-6'>
			<h1 className='text-3xl font-bold mb-4'>Account Suspended</h1>
			<Image
				src='/suspend.png'
				alt='Suspended account'
				width={300}
				height={300}
				className='rounded-full mx-auto mb-6'
			/>
			<p className='text-lg'>
				We're sorry, but your account has been temporarily suspended. This could
				be due to a violation of our community guidelines or other security
				issues.
			</p>
			<p className='mt-4 text-lg'>
				If you believe this is a mistake or have any questions, please contact
				our support team at{' '}
				<a
					href='mailto:support@icmmoney.com'
					className='text-blue-500 underline'
				>
					support@icmmoney.com
				</a>
				.
			</p>
			<p className='mt-4 text-lg'>
				We appreciate your understanding and cooperation.
			</p>
		</div>
	);
};

export default Suspend;
