'use client';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useSearchParams } from 'next/navigation';
import {
	Button,
	Card,
	Checkbox,
	Label,
	Select,
	TextInput,
} from 'flowbite-react';

import countries from '@/lib/countries';

import {
	setActiveStep,
	setCompletedStep,
	handleNext,
	setPersonalData,
} from '@/redux/stepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckEmailExistOrNotMutation } from '@/redux/features/auth/authApi';

const PersonalDetails = () => {
	const dispatch = useDispatch();

	const [checkEmailExistOrNot, { data, isSuccess, isLoading, isError, error }] =
		useCheckEmailExistOrNotMutation();
	const { isExist } = data || {};

	useEffect(() => {
		if (isExist) {
			setEmailError(true);
			setEmailErrorText('Email already exist');
		}
	}, [isExist]);

	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState(
		'Please enter a valid email address'
	);
	const [code, setCode] = useState<string>('us');
	const [partnerCode, setPartnerCode] = useState<string>('');
	const [edit, setEdit] = useState(true);
	const [phone, setPhone] = useState<string>('');
	const [phoneError, setPhoneError] = useState<boolean>(false);

	const searchParams = useSearchParams();
	const partner_code = searchParams.get('partner_code');

	useEffect(() => {
		if (partner_code) {
			setPartnerCode(partner_code);
			setEdit(false);
		}
	}, [partner_code]);

	// useEffect to set the active step
	useEffect(() => {
		dispatch(setActiveStep(1));
	}, [dispatch]);

	const handlePhoneNumberChange = (value: string) => {
		if (value) {
			setPhoneError(false);
		}
		setPhone(value);
	};

	// handle country change
	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCountry(e.target.value);

		// set code based on selected country
		const selectedCountry = countries.find(
			(countryItem) => countryItem.name === e.target.value
		);
		console.log(selectedCountry);
		if (selectedCountry) {
			setCode(selectedCountry.code.toLocaleLowerCase());
		}
	};

	// handle email change
	const handleEmailCheck = () => {
		const data = {
			email,
		};
		if (email) {
			checkEmailExistOrNot(data);
		}
	};

	// next handler
	const nextHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			nameError ||
			name === '' ||
			emailError ||
			email === '' ||
			phoneError ||
			phone === ''
		)
			return;
		dispatch(
			setPersonalData({
				country,
				name,
				email,
				mobile: phone,
				partnerCode: partnerCode ? partnerCode : '202006',
			})
		);
		dispatch(setCompletedStep(1));
		dispatch(handleNext());
	};

	// error handler

	return (
		<div className='mb-4 '>
			<h1 className='text-xl font-bold mb-4 ml-1'>Registration</h1>
			<div className=' p-0 bg-red-500 w-full '>
				<form className='  gap-4 ' onSubmit={nextHandler}>
					{/* Start Name */}
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='name1'
								value='Your name'
								color={nameError ? 'failure' : ''}
							/>
						</div>
						<TextInput
							id='name1'
							type='text'
							placeholder='Enter your name'
							required
							color={nameError ? 'failure' : ''}
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={() => setNameError(name.length === 0)}
							helperText={
								<>
									{nameError && (
										<span className='text-xs'>Please enter your name</span>
									)}
								</>
							}
						/>
					</div>
					{/* End Name */}

					{/* Start Email */}
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='email1'
								value='Your email'
								color={emailError ? 'failure' : ''}
							/>
						</div>
						<TextInput
							id='email1'
							type='email'
							placeholder='Enter your email address'
							required
							color={emailError ? 'failure' : ''}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={() => {
								handleEmailCheck();
								setEmailError(
									(email.length > 0 && !email.includes('@')) ||
										email.length === 0
								);
							}}
							helperText={
								<>
									{emailError && (
										<span className='text-xs'>{emailErrorText}</span>
									)}
								</>
							}
						/>
					</div>
					{/* End Email */}

					{/* Start Phone*/}

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='phone' value='Your phone number ' />
						</div>
						<PhoneInput
							placeholder='Enter phone number'
							value={phone}
							onChange={(phoneNumber) => handlePhoneNumberChange(phoneNumber)}
							country={code}
							dropdownStyle={{
								backgroundColor: '#05003A',
								color: 'gray',
							}}
							inputStyle={{
								backgroundColor: 'transparent',
								color: ` ${phoneError ? 'red' : 'gray'}`,
								width: '100%',
								height: '42px',
								border: ` ${phoneError ? '1px solid red' : '1px solid gray'}`,
								borderRadius: '5px',
							}}
							buttonStyle={{
								backgroundColor: 'transparent',
								borderColor: ` ${phoneError ? 'red' : 'gray'}`,
							}}
							countryCodeEditable={false}
							disableDropdown={true}
						/>
					</div>

					{/* End Phone*/}

					{/* Start Partner code */}

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='partnerCode' value='Partner code (Optional)' />
						</div>
						<TextInput
							id='partnerCode'
							type='text'
							placeholder='Enter your partner code'
							value={partnerCode}
							onChange={(e) => setPartnerCode(e.target.value)}
							disabled={edit ? false : true}
						/>
					</div>

					{/* End Partner code */}

					<Button
						type='submit'
						className='w-full bg-green-500 hover:bg-icm-green-700 text-gray-800 font-semibold'
					>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default PersonalDetails;
