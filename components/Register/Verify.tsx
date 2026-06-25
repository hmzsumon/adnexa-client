'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleNext,
	setActiveStep,
	setCompletedStep,
} from '@/redux/stepperSlice';
import {
	useResendVerificationEmailMutation,
	useVerifyEmailMutation,
} from '@/redux/features/auth/authApi';

const Verify = () => {
	const dispatch = useDispatch();
	// Set active step on component mount
	useEffect(() => {
		dispatch(setActiveStep(5));
	}, [dispatch]);

	// call verify email api
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

	const { personalData } = useSelector((state: any) => state.stepper);
	const { email } = personalData;

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
			dispatch(setCompletedStep(5));
			dispatch(handleNext());
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error, dispatch]);

	return (
		<div className='my-10'>
			<h2 className='my-4 text-gray-800 font-bold'>Verify Your Email</h2>
			<Card className='w-[23rem]'>
				<p className='text-xs'>
					We have sent a verification code to{' '}
					<span className='font-bold'>{email}</span>
				</p>
				<form className='flex flex-col gap-4' onSubmit={handleVerify}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='email1' value='Enter Verification Code' />
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
						<span className='mt-1 flex justify-end pr-2 text-xs'>
							Didn’t get the code?{' '}
							<span
								className={`font-bold cursor-pointer hover:text-icm-green ml-1 ${
									resendDisabled ? 'text-icm-green' : ''
								}`}
								onClick={handleResend}
							>
								{resendDisabled ? `Resend in ${timer} seconds` : 'Resend'}
							</span>
						</span>
					</div>
					<Button type='submit'>Submit</Button>
				</form>
			</Card>
		</div>
	);
};

export default Verify;
