import React from 'react';

const LegalBanner = () => {
	return (
		<div className='legal-banner-bg bg-cover bg-center h-[200px] text-white space-y-2'>
			<div className='md:w-7/12 mx-auto px-4'>
				<h2 className='text-3xl font-semibold  text-center pt-10'>
					Legal Documents
				</h2>
				<p className='my-2'>
					Legal documents – All relevant legal documentation required for
					managing and understanding your legal relationship with IC Markets
					Global can be found here.
				</p>
			</div>
		</div>
	);
};

export default LegalBanner;
