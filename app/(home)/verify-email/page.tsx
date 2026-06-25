'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useSearchParams, useRouter } from 'next/navigation';

import {
	useResendVerificationEmailMutation,
	useVerifyEmailMutation,
} from '@/redux/features/auth/authApi';

const VerifyEmail = () => {
	const searchParams = useSearchParams();
	const email = searchParams.get('email');
	const router = useRouter();

	const [verifyEmail, { isLoading, isSuccess, isError, error }] =
		useVerifyEmailMutation();

	// call resend email verification api
	const [
		resendVerificationEmail,
		{
			isLoading: isResendLoading,
			isSuccess: isResendSuccess,
			isError: isResendError,
			error: resendError,
		},
	] = useResendVerificationEmailMutation();

	// State variables for verification code and timer
	const [verificationCode, setVerificationCode] = useState('');
	const [codeError, setCodeError] = useState(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [timer, setTimer] = useState(30); // Initial timer value

	// handle verification
	const handleVerify = (e: any) => {
		e.preventDefault();
		if (!verificationCode) {
			setCodeError(true);
		} else {
			verifyEmail({ email, verificationCode });
		}
	};

	// Handle resend click
	const handleResend = () => {
		resendVerificationEmail({ email });
		setResendDisabled(true); // Disable resend button
		setTimer(30); // Reset timer
	};

	// useEffect to handle timer countdown
	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (timer > 0 && resendDisabled) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else {
			setResendDisabled(false); // Enable resend button when timer finishes
		}

		return () => clearInterval(intervalId); // Cleanup interval
	}, [timer, resendDisabled]);

	// useEffect to set the active step
	useEffect(() => {
		if (isSuccess) {
			toast.success('Email verified successfully');
			router.push('/'); // Redirect to login page
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<div className='bg-transparent py-10'>
			<div className=' w-full md:w-6/12 mx-auto px-4'>
				<h2 className=' text-gray-200 font-bold my-4'>Verify Your Email</h2>
				<Card className='w-full bg-transparent  border border-cbc-orange'>
					<p className='text-xs text-gray-400'>
						We have sent a verification code to{' '}
						<span className='font-bold text-cbc-orange'>{email}</span>
					</p>
					<form className='flex flex-col gap-4' onSubmit={handleVerify}>
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='email1'
									value='Enter Verification Code'
									color={codeError ? 'failure' : 'white'}
									className='text-gray-200'
								/>
							</div>
							<TextInput
								id='email1'
								type='text'
								placeholder='Verification code'
								required
								color={codeError ? 'failure' : ''}
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value)}
							/>
							<span className='mt-1 flex justify-end pr-2 text-xs text-gray-300'>
								Didn’t get the code?{' '}
								<span
									className={`font-bold cursor-pointer hover:text-cbc-orange ml-1 ${
										resendDisabled ? 'text-icm-green' : ''
									}`}
									onClick={handleResend}
								>
									{resendDisabled ? `Resend in ${timer} seconds` : 'Resend'}
								</span>
							</span>
						</div>
						<Button
							type='submit'
							disabled={isLoading}
							className='bg-cbc-orange hover:bg-icm-green-600 text-white font-bold  rounded focus:outline-none focus:shadow-outline'
						>
							Submit
						</Button>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default VerifyEmail;
