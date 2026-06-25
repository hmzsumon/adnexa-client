import React from 'react';

const WhyIcmBanner = () => {
	return (
		<div className='why-icm-banner-bg bg-cover bg-center h-[200px] text-white space-y-2'>
			{/* <img src='/assets/live-banner.webp' alt='' /> */}
			<h2 className='text-3xl font-semibold  text-center pt-10'>
				Why Choose ICM Money?
			</h2>
			<div className=' flex items-center justify-center my-2'>
				<button className='bg-icm-green text-gray-800 font-bold px-4 py-2 rounded-md hover:bg-green-500'>
					Join Us Now
				</button>
			</div>
		</div>
	);
};

export default WhyIcmBanner;
