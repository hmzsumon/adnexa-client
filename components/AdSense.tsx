'use client';
import React, { useEffect } from 'react';

const AdSense = () => {
	useEffect(() => {
		// Create the script for the ad configuration
		const adConfigScript = document.createElement('script');
		adConfigScript.type = 'text/javascript';
		adConfigScript.innerHTML = `
            atOptions = {
                'key': '2f6ec947af04c80696782480b49a35ad',
                'format': 'iframe',
                'height': 50,
                'width': 320,
                'params': {}
            };
        `;
		document.body.appendChild(adConfigScript);

		// Create the script for invoking the ad
		const adInvokeScript = document.createElement('script');
		adInvokeScript.type = 'text/javascript';
		adInvokeScript.src =
			'//www.highperformanceformat.com/2f6ec947af04c80696782480b49a35ad/invoke.js';
		document.body.appendChild(adInvokeScript);

		// Cleanup scripts when the component is unmounted
		return () => {
			document.body.removeChild(adConfigScript);
			document.body.removeChild(adInvokeScript);
		};
	}, []);

	return (
		<div
			className='hidden w-full bg-transparent'
			id='2f6ec947af04c80696782480b49a35ad'
		>
			{/* Ad placeholder */}
		</div>
	);
};

export default AdSense;
