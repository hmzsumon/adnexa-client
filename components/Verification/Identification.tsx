'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Card } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Label, Radio } from 'flowbite-react';
import IDCardsExample from './IDCardsExample';
import PassportExample from './PassportExample';
import ImageUpload from '../Upload/image-upload';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { setStep } from '@/redux/verificationSlice';
import { useDispatch } from 'react-redux';
import { useCreateVerifyStep02Mutation } from '@/redux/features/kyc/kycApi';

const Identification = () => {
	const dispatch = useDispatch();

	const [
		createVerifyStep02,
		{
			isLoading: kycLoading,
			isSuccess: kycIsSuccess,
			isError: kycIsError,
			error: kycError,
		},
	] = useCreateVerifyStep02Mutation();

	const { user } = useSelector((state: any) => state.auth);
	const [documentType, setDocumentType] = useState('ID card');
	const [imageUrl1, setImageUrl1] = useState<string>('');
	const [imageUrl2, setImageUrl2] = useState<string>('');
	const [passportUrl, setPassportUrl] = useState<string>('');

	// handle the change event of the radio button
	const handleChange = (e: any) => {
		setDocumentType(e.target.value);
		// console.log(e.target.value);
	};

	// handle submit
	const handleSubmit = (e: any) => {
		e.preventDefault();

		// check if the user has uploaded the required images
		if (documentType === 'Passport' && !passportUrl) {
			toast.error('Please upload the passport image');
			return;
		}

		if (documentType !== 'Passport' && (!imageUrl1 || !imageUrl2)) {
			toast.error('Please upload both sides of the document');
			return;
		}
		const data = {
			documentType,
			imageUrl1,
			imageUrl2,
			passportUrl,
		};
		console.log(data);
		createVerifyStep02(data);
	};

	// handle the error
	useEffect(() => {
		if (kycIsSuccess) {
			toast.success('Personal information saved successfully');
			dispatch(setStep(3));
		}

		if (kycIsError) {
			toast.error((kycError as fetchBaseQueryError).data?.message);
		}
	}, [kycIsSuccess, kycIsError, kycError]);

	return (
		<div>
			<Card>
				<h2 className='text-xl font-semibold mb-4 uppercase text-center text-gray-700'>
					Identification
				</h2>
				<div>
					<div>
						<h4 className=' text-gray-600'>
							<span>Issuing country:</span>{' '}
							<span className=' font-semibold'>{user?.country}</span>
						</h4>
					</div>

					<div className='mt-6'>
						<fieldset className='flex max-w-md flex-col gap-2'>
							<h4 className=' text-gray-600'> Choose your document type: </h4>
							<div className='flex items-center gap-2'>
								<Radio
									id='passport'
									name='documentType'
									value='Passport'
									onChange={handleChange}
								/>
								<Label htmlFor='passport'>Passport </Label>
							</div>

							<div className='flex items-center gap-2'>
								<Radio
									id='driverLicense'
									name='documentType'
									value='Drivers License'
									onChange={handleChange}
								/>
								<Label htmlFor='driverLicense'>Driver's License</Label>
							</div>
							<div className='flex items-center gap-2'>
								<Radio
									id='idCard'
									name='documentType'
									value='ID card'
									onChange={handleChange}
								/>
								<Label htmlFor='idCard'>ID card </Label>
							</div>

							<div className='flex items-center gap-2'>
								<Radio
									id='residence_permit'
									name='documentType'
									value='Residence Permit'
									onChange={handleChange}
								/>
								<Label htmlFor='residence_permit'>Residence Permit </Label>
							</div>
						</fieldset>
					</div>
				</div>

				<div className=' mt-6'>
					<h2 className=' text-gray-700 font-semibold'>
						Take a photo of your {documentType}. The photo should be:
					</h2>
					<div className=' my-2 text-gray-700 ml-2'>
						<ul className=' list-disc list-inside'>
							<li>Clear and legible</li>
							<li>All corners of the document should be visible</li>
						</ul>

						<div className=' my-4'>
							{documentType === 'Passport' ? (
								<PassportExample />
							) : (
								<IDCardsExample />
							)}
						</div>
					</div>
				</div>

				<div>
					{documentType === 'Passport' ? (
						<ImageUpload imageUrl={passportUrl} setImageUrl={setPassportUrl} />
					) : (
						<div className=' grid gap-4 md:grid-cols-2'>
							<ImageUpload
								part='front'
								imageUrl={imageUrl1}
								setImageUrl={setImageUrl1}
							/>
							<ImageUpload
								part='back'
								imageUrl={imageUrl2}
								setImageUrl={setImageUrl2}
							/>
						</div>
					)}
				</div>

				<div className=' flex justify-end gap-4'>
					<button
						type='submit'
						className='bg-green-400 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-fit'
						onClick={() => dispatch(setStep(1))}
					>
						<FaArrowLeftLong />
						Back
					</button>
					<button
						type='submit'
						className='bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={handleSubmit}
						disabled={
							kycLoading ||
							(documentType === 'ID card' && (!imageUrl1 || !imageUrl2)) ||
							(documentType === 'Passport' && !passportUrl)
						}
					>
						Next
						<FaArrowRightLong />
					</button>
				</div>
			</Card>
		</div>
	);
};

export default Identification;
