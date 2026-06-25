import React from 'react';

const PrivacyBanner = ({ title }: any) => {
	return (
		<div className='bg-cover bg-center  text-gray-800 space-y-2'>
			{/* <img src='/assets/live-banner.webp' alt='' /> */}
			<h2 className='text-3xl font-semibold  text-center pt-10'>{title}</h2>
		</div>
	);
};

export default PrivacyBanner;
