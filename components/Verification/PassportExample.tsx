import Image from 'next/image';
import React from 'react';
import Img_1 from '@/public/demo/pass_1.png';
import Img_2 from '@/public/demo/pass_2.png';
import Img_3 from '@/public/demo/pass_3.png';

const images = [
	{
		id: 1,
		src: Img_1,
		alt: 'ID Card Example 1',
	},
	{
		id: 2,
		src: Img_2,
		alt: 'ID Card Example 2',
	},
	{
		id: 3,
		src: Img_3,
		alt: 'ID Card Example 3',
	},
];

const PassportExample = () => {
	return (
		<div className=' grid grid-cols-3 gap-4 md:gap-6 md:w-7/12 mx-auto'>
			{images.map((image) => (
				<div key={image.id}>
					<Image
						src={image.src}
						alt={image.alt}
						className='  h-auto rounded-lg shadow-lg'
					/>
				</div>
			))}
		</div>
	);
};

export default PassportExample;
