import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import ImageUpload from '../Upload/image-upload';
import SelfieExample from './SelfieExample';
import { Card } from 'flowbite-react';
import { useCreateVerifyStep03Mutation } from '@/redux/features/kyc/kycApi';
import { useRouter } from 'next/navigation';

const Selfie = () => {
	const router = useRouter();
	const [
		createVerifyStep03,
		{
			isLoading: kycLoading,
			isSuccess: kycIsSuccess,
			isError: kycIsError,
			error: kycError,
		},
	] = useCreateVerifyStep03Mutation();

	const [selfieUrl, setSelfieUrl] = useState<string>('');

	// handle submit
	const handleSubmit = (e: any) => {
		console.log('submitting', selfieUrl);
		// check if the user has uploaded the required images
		if (!selfieUrl) {
			toast.error('Please upload the selfie image');
			return;
		}

		const data = {
			selfieUrl,
		};

		// dispatch the action
		createVerifyStep03(data);
	};

	// handle the error
	useEffect(() => {
		if (kycIsSuccess) {
			toast.success('Personal information saved successfully');
			// dispatch(setStep(4));
			router.push('/settings');
		}

		if (kycIsError) {
			toast.error((kycError as fetchBaseQueryError).data?.message);
		}
	}, [kycIsSuccess, kycIsError, kycError]);

	return (
		<div className=' my-4'>
			<div>
				<Card>
					<h2 className='text-xl font-semibold mb-4 uppercase text-center text-gray-700'>
						Selfie
					</h2>

					<div>
						<p className=' text-gray-700 text-justify tracking-tight leading-5'>
							Take a photo of yourself holding the document. Both your face and
							the document must be: fully visible, in the picture. The document
							must be the same one you provided previously.
						</p>
					</div>

					<div className=' my-4'>
						<SelfieExample />
					</div>

					<div>
						<ImageUpload imageUrl={selfieUrl} setImageUrl={setSelfieUrl} />
					</div>

					<div className=' flex justify-end gap-4'>
						<button
							type='submit'
							className='bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSubmit}
							disabled={kycLoading || !selfieUrl}
						>
							Submit
						</button>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Selfie;
