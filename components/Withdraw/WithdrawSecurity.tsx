'use client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
	useResendVerificationEmailMutation,
	useSecurityVerify2Mutation,
	useVerifyEmailMutation,
} from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';
import { MdOutlineDone } from 'react-icons/md';
import { maskEmail, maskEmail2 } from '@/lib/functions';

const WithdrawSecurity = ({ openModal, setOpenModal, handleSubmit }: any) => {
	const { user } = useSelector((state: any) => state.auth);

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

	// call verify email api
	const [verifyEmail, { isLoading, isSuccess, isError, error }] =
		useVerifyEmailMutation();

	// call Security Verification api
	const [
		securityVerify2,
		{
			isLoading: s_isLoading,
			isSuccess: s_isSuccess,
			isError: s_isError,
			error: s_error,
		},
	] = useSecurityVerify2Mutation();

	const [code, setCode] = useState<string>('');
	const [codeError, setCodeError] = useState<boolean>(false);
	const [codeErrorText, setCodeErrorText] = useState<string>('');
	const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
	const [passCode, setPassCode] = useState<string>('');
	const [passCodeError, setPassCodeError] = useState<boolean>(false);
	const [passCodeErrorText, setPassCodeErrorText] = useState<string>('');
	const [passCodeVerified, setPassCodeVerified] = useState<boolean>(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [timer, setTimer] = useState(30); // Initial timer value

	// Handle resend click
	const handleResend = () => {
		setVerifySuccess(false);
		resendVerificationEmail({ email: user?.email });
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

	// handle verification
	const handleVerify = () => {
		if (!code) {
			setCodeError(true);
		} else {
			verifyEmail({ email: user?.email, verificationCode: code });
		}
	};

	// useEffect to verify email
	useEffect(() => {
		if (isSuccess) {
			toast.success('Email verified successfully');
			setVerifySuccess(true);
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
			setCodeError(true);
			setCodeErrorText('Invalid security code');
			setVerifySuccess(false);
		}
	}, [isSuccess, isError, error]);

	// handle code change
	const handleCodeChange = (e: any) => {
		const value = e.target.value;
		setCode(value);
	};

	// handle security verify
	const handleSecurityVerify = () => {
		if (!passCode) {
			setPassCodeError(true);
			setPassCodeErrorText('Invalid pass code');
			return;
		}
		securityVerify2({ email: user?.email, passCode });
	};

	// useEffect to handle security verify
	useEffect(() => {
		if (s_isSuccess) {
			toast.success('Security verified successfully');
			setPassCodeVerified(true);
		}

		if (s_isError) {
			toast.error((s_error as fetchBaseQueryError).data?.message);
			setPassCodeError(true);
			setPassCodeErrorText('Invalid pass code');
			setPassCodeVerified(false);
		}
	}, [s_isSuccess, s_isError, s_error]);

	// on blur code handler
	const handleCodeBlur = () => {
		//call handle verify function
		handleVerify();
		if (code.length < 6 || code.length > 6) {
			setCodeError(true);
			setCodeErrorText('Invalid code');
		} else {
			setCodeError(false);
		}
	};

	// handle pass code change
	const handlePassCodeChange = (e: any) => {
		const value = e.target.value;
		setPassCode(value);
	};

	// on blur pass code handler
	const handlePassCodeBlur = () => {
		//call handle verify function
		handleSecurityVerify();
		if (passCode.length < 6 || passCode.length > 6) {
			setPassCodeError(true);
			setPassCodeErrorText('Invalid code');
		} else {
			setPassCodeError(false);
		}
	};

	// handle confirm button
	const handleConfirm = () => {
		if (codeError || !code) {
			return;
		}
		handleSubmit();
		setOpenModal(false);
		setVerifySuccess(false);
		setPassCodeVerified(false);
	};
	return (
		<div>
			<>
				<Modal
					show={openModal}
					size='md'
					popup
					onClose={() => setOpenModal(false)}
				>
					<Modal.Header />
					<Modal.Body>
						<div className='space-y-6'>
							<h3 className='text-xl font-medium text-gray-900 dark:text-white'>
								Email Verification
							</h3>
							<small>
								Enter the 6 digit code sent to your email{' '}
								{maskEmail(user?.email)}
							</small>
							<div>
								<div className='mb-2 block'>
									<Label
										htmlFor='code1'
										value='Email Verification Code'
										color={codeError ? 'failure' : ''}
									/>
								</div>
								<TextInput
									id='code1'
									placeholder='Enter 6 digit code'
									color={codeError ? 'failure' : ''}
									onChange={handleCodeChange}
									onBlur={handleCodeBlur}
									helperText={codeError && codeErrorText}
									readOnly={verifySuccess}
								/>
								{verifySuccess ? (
									<p className='text-right text-xs flex justify-end items-center font-semibold mr-2 mt-1 cursor-pointer text-cbc-orange'>
										<MdOutlineDone className=' text-xl mr-1 font-bold' />
										Email verified successfully
									</p>
								) : (
									<small
										onClick={handleResend}
										className='text-right flex justify-end font-semibold mr-2 mt-1 cursor-pointer text-cbc-orange'
									>
										{resendDisabled
											? `Resend in ${timer} seconds`
											: 'Get Code!'}
									</small>
								)}
							</div>

							<div className='w-full'>
								<Button
									className='w-full bg-cbc-orange text-gray-200 font-bold'
									disabled={codeError || !code}
									onClick={handleConfirm}
								>
									Confirm
								</Button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>
		</div>
	);
};

export default WithdrawSecurity;
