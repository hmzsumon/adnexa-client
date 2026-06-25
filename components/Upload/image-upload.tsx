'use client';

import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const ImageUpload = ({ part, imageUrl, setImageUrl }: any) => {
	const [fileName, setFileName] = useState<string>('');

	// handle change
	const handleChange = (e: any) => {
		const { name, value } = e.target;
	};
	return (
		<main className='px-4'>
			{/*End Wallet address */}
			{imageUrl ? (
				<div>
					<div className=' relative'>
						<Image
							src={imageUrl}
							alt='wallet'
							width={200}
							height={200}
							className='h-auto rounded-lg w-full ring-2 ring-blue-500'
						/>

						<button
							onClick={() => setImageUrl('')}
							className=' absolute top-[50%] right-[50%] transform translate-x-[50%] -translate-y-[50%] text-white text-4xl bg-red-500 rounded-full p-3'
						>
							<MdDelete className='text-white' />
						</button>
					</div>
					{/* cancel imag button */}
				</div>
			) : (
				<div>
					<Card>
						<div>
							<div className=' my-6'>
								<FaCloudUploadAlt className='text-icm-green text-6xl mx-auto' />
							</div>
							<div>
								{part ? (
									<h2 className=' text-center text-gray-700 font-semibold'>
										Upload The
										<span className=' text-icm-green mx-1 font-bold'>
											{part}
										</span>
										of your document.
									</h2>
								) : (
									<h2 className=' text-center text-gray-700 font-semibold'>
										Upload your document.
									</h2>
								)}
							</div>
						</div>
						<UploadButton
							endpoint='imageUploader'
							onClientUploadComplete={(res) => {
								// Do something with the response
								// console.log('Files: ', res);
								setImageUrl(res[0].url);
								setFileName(res[0].name);
							}}
							onUploadError={(error: Error) => {
								// Do something with the error.
								alert(`ERROR! ${error.message}`);
							}}
						/>
					</Card>
				</div>
			)}
		</main>
	);
};

export default ImageUpload;
