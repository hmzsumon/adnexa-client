'use client';

import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import img from '@/public/user.png';

const ImageUpload = ({ part }: any) => {
	const [imgUrl, setImgUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	// Callback function to handle file upload
	const handleFileUpload = (files: any) => {
		// Assuming you only want to handle the first selected file
		const file = files[0];
		// Create a URL for the selected file
		const url = URL.createObjectURL(file);
		// Set the imgUrl state with the URL
		setImgUrl(url);
	};

	// Function to open file dialog when div is clicked
	const handleDivClick = () => {
		// Programmatically trigger the click event of the file input element
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className='px-4' onClick={handleDivClick}>
			{/* Hidden file input element */}
			<input
				type='file'
				style={{ display: 'none' }}
				ref={fileInputRef}
				onChange={(e) => handleFileUpload(e.target.files)}
			/>
			{/* Div that triggers file upload when clicked */}
			<div>
				<UploadDropzone
					endpoint='imageUploader'
					content={{
						uploadIcon: () => {
							if (!imgUrl) return null;
							return (
								<div className='flex items-center justify-center'>
									<Image
										src={imgUrl}
										alt='upload icon'
										width={100}
										height={100}
									/>
								</div>
							);
						},

						allowedContent({ ready, fileTypes, isUploading }) {
							if (!ready) return 'Checking what you allow';
							if (isUploading) return 'Seems like stuff is uploading';
							return `Stuff you can upload: ${fileTypes.join(', ')}`;
						},
						label({ ready, isUploading }) {
							if (!ready) return <p>Checking what you allow</p>;
							if (ready)
								return (
									<p className=' text-gray-700'>
										Upload The
										<span className=' text-icm-green mx-1 font-semibold'>
											{part ? part : 'back'}
										</span>
										of your ID card.{' '}
									</p>
								);
							if (isUploading) return 'Seems like stuff is uploading';
							return 'Drop your stuff here';
						},
					}}
					onUploadBegin={(name) => {
						// Do something once upload begins
						console.log('Uploading: ', name);
					}}
					onBeforeUploadBegin={(files) => {
						// Preprocess files before uploading (e.g. rename them)
						console.log('Before uploading: ', files[0].name);
						return files.map(
							(f) => new File([f], 'renamed-' + f.name, { type: f.type })
						);
					}}
				/>
			</div>
		</div>
	);
};

export default ImageUpload;
