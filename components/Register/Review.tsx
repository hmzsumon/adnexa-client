import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import {
	setActiveStep,
	setCompletedStep,
	handleNext,
	handlePrevious,
	setSecurityData,
} from '@/redux/stepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Checkbox, Label } from 'flowbite-react';
import { formatDate } from '@/lib/functions';
import {
	useGetUserByPartnerIdQuery,
	useRegisterUserMutation,
} from '@/redux/features/auth/authApi';

const Review = () => {
	const [registerUser, { isSuccess, isLoading, isError, error }] =
		useRegisterUserMutation();
	const dispatch = useDispatch();
	const { personalData, moreAboutData, securityData } = useSelector(
		(state: any) => state.stepper
	);

	const { data, isLoading: isLoadingUser } = useGetUserByPartnerIdQuery(
		personalData?.partnerCode
	);
	const { user } = data || {};

	const [confirmDetails, setConfirmDetails] = useState(false);
	const [confirmDetailsError, setConfirmDetailsError] = useState(false);
	const [agreeToTerms, setAgreeToTerms] = useState(false);
	const [agreeToTermsError, setAgreeToTermsError] = useState(false);

	// useEffect to set the active step
	useEffect(() => {
		dispatch(setActiveStep(4));
	}, [dispatch]);

	// next handler
	const nextHandler = () => {
		if (!confirmDetails) {
			setConfirmDetailsError(true);
			return;
		}
		if (!agreeToTerms) {
			setAgreeToTermsError(true);
			return;
		}
		const data = { ...personalData, ...moreAboutData, ...securityData };
		// console.log(data);

		registerUser(data);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Account created successfully');
			dispatch(setCompletedStep(4));
			dispatch(handleNext());
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);
	return (
		<div className='my-10'>
			<h1 className='text-2xl font-bold tracking-tight text-gray-800 my-2'>
				Review your details
			</h1>

			<div className=' space-y-3'>
				{/* Start Personal */}
				<Card className='w-[23rem]'>
					<h5 className='text-xl font-bold tracking-tight text-gray-800'>
						Your Personal Details
					</h5>
					<hr />
					<div className=' space-y-2'>
						<div>
							<p className='text-gray-600  '>Country of Residence</p>
							<p className='text-gray-800 font-bold '>{personalData.country}</p>
						</div>
						<div>
							<p className='text-gray-600  '>Full Name</p>
							<p className='text-gray-800 font-bold '>{personalData.name}</p>
						</div>

						<div>
							<p className='text-gray-600  '>Email</p>
							<p className='text-gray-800 font-bold '>{personalData.email}</p>
						</div>
						<div>
							<p className='text-gray-600  '>Phone Number</p>
							<p className='text-gray-800 font-bold '>{personalData.mobile}</p>
						</div>
					</div>
				</Card>
				{/* End Personal */}

				{/* Start More Details */}
				<Card className='w-[23rem]'>
					<h5 className='text-xl font-bold tracking-tight text-gray-800'>
						More about yourself
					</h5>
					<hr />
					<div className=' space-y-2'>
						<div>
							<p className='text-gray-600  '>Date of Birth</p>
							<p className='text-gray-800 font-bold '>
								{formatDate(moreAboutData.dateOfBirth)}
							</p>
						</div>
						<div>
							<p className='text-gray-600  '>Address</p>
							<p className='text-gray-800 font-bold '>
								{moreAboutData.address}
							</p>
						</div>

						<div>
							<p className='text-gray-600  '>City</p>
							<p className='text-gray-800 font-bold '>{moreAboutData.city}</p>
						</div>
						<div>
							<p className='text-gray-600  '>State / Province</p>
							<p className='text-gray-800 font-bold '>{moreAboutData.state}</p>
						</div>

						<div>
							<p className='text-gray-600  '>Postal / Zip Code</p>
							<p className='text-gray-800 font-bold '>{moreAboutData.zip}</p>
						</div>

						<div>
							<p className='text-gray-600  '>Refer By:</p>
							<p className='text-gray-800 font-bold '>
								{isLoadingUser ? (
									<PulseLoader size={8} color={'#36d7b7'} />
								) : (
									user?.name
								)}
							</p>
						</div>
					</div>
				</Card>
				{/* End More Details */}

				<div className='flex items-center gap-2'>
					<Checkbox
						id='confirm_details'
						onChange={() => {
							setConfirmDetails(!confirmDetails);
							setConfirmDetailsError(false);
						}}
						checked={confirmDetails}
					/>
					<Label
						htmlFor='confirm_details'
						color={confirmDetailsError ? 'failure' : ''}
					>
						I confirm that the details above are correct.
					</Label>
				</div>
				{confirmDetailsError && (
					<p className='text-red-500 text-xs ml-4 font-bold'>
						You must confirm that the details above are correct!
					</p>
				)}

				<div className='flex items-center gap-2'>
					<Checkbox
						id='agree_to_terms'
						onChange={() => {
							setAgreeToTerms(!agreeToTerms);
							setAgreeToTermsError(false);
						}}
						checked={agreeToTerms}
					/>
					<Label
						htmlFor='agree_to_terms'
						color={agreeToTermsError ? 'failure' : ''}
					>
						I agree to the terms and conditions
					</Label>
				</div>
				{agreeToTermsError && (
					<p className='text-red-500 text-xs ml-4 font-bold '>
						You must agree to the terms and conditions!
					</p>
				)}

				{/* Buttons */}
				<div className=' grid grid-cols-2 gap-4'>
					<Button
						type='submit'
						className='w-full bg-gray-400 hover:bg-icm-green-700 text-gray-800 font-semibold'
						onClick={() => dispatch(handlePrevious(4))}
					>
						Back
					</Button>
					<Button
						onClick={nextHandler}
						className='w-full bg-icm-green hover:bg-icm-green-700 text-gray-800 font-semibold'
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Review;
