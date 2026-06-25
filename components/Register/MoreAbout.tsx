'use client';
import React, { useEffect, useState } from 'react';
import { createUTCDateOfBirth, formatDate } from '@/lib/functions';
import {
	Button,
	Card,
	Datepicker,
	Label,
	Select,
	TextInput,
} from 'flowbite-react';

import {
	setActiveStep,
	setCompletedStep,
	handleNext,
	handlePrevious,
	setMoreAboutData,
} from '@/redux/stepperSlice';
import { useDispatch } from 'react-redux';
import CustomSelect from '../CustomSelect';

const MoreAbout = () => {
	const dispatch = useDispatch();
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [dobDay, setDobDay] = useState<string>('');
	const [dobMonth, setDobMonth] = useState<string>('');
	const [dobYear, setDobYear] = useState<string>('');

	const [dobError, setDobError] = useState(false);
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState(false);
	const [city, setCity] = useState('');
	const [cityError, setCityError] = useState(false);
	const [state, setState] = useState('');
	const [stateError, setStateError] = useState(false);
	const [zip, setZip] = useState('');
	const [zipError, setZipError] = useState(false);

	const handleDobDayChange = (value: string) => {
		setDobDay(value);
	};

	const handleDobMonthChange = (value: string) => {
		setDobMonth(value);
	};

	const handleDobYearChange = (value: string) => {
		setDobYear(value);
	};

	// useEffect to set the active step
	useEffect(() => {
		dispatch(setActiveStep(2));
	}, [dispatch]);

	// handle date of birth change
	const handleDobChange = (date: Date) => {
		console.log(date);
		if (date) {
			setDobError(false);
			// Clone the date object to avoid mutating the original date
			const newDate = new Date(date);

			// Add one day to the date
			newDate.setDate(newDate.getDate() + 1);

			// Set the modified date as the DateOfBirth state
			setDateOfBirth(newDate.toISOString().substring(0, 10));
		} else {
			setDobError(true);
		}
	};

	// handle address change
	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
		setAddressError(e.target.value === '');
	};

	// next handler
	const nextHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// create date of birth utc string
		const dateOfBirth = createUTCDateOfBirth(dobDay, dobMonth, dobYear);
		if (
			dobError ||
			dateOfBirth === '' ||
			addressError ||
			address === '' ||
			cityError ||
			city === '' ||
			stateError ||
			state === '' ||
			zipError ||
			zip === ''
		)
			return;
		dispatch(setMoreAboutData({ dateOfBirth, address, city, state, zip }));
		dispatch(setCompletedStep(2));
		dispatch(handleNext());
	};

	return (
		<div className='my-10 '>
			<div>
				<h1 className='text-xl font-bold mb-4 ml-1'>
					Tell us more about yourself.
				</h1>
			</div>
			<div>
				<Card className='w-[23rem]'>
					<form className='flex flex-col gap-4' onSubmit={nextHandler}>
						{/* Start DOB */}
						<div className=''>
							<label className='block mb-2'>Date of Birth:</label>
							<div className=' grid grid-cols-7 gap-2'>
								<div className=' col-span-2'>
									<CustomSelect
										options={[...Array(31)].map((_, i) => ({
											label: (i + 1).toString(),
											value: (i + 1).toString(),
										}))}
										value={dobDay}
										onChange={handleDobDayChange}
										title='Day'
										defaultValue='Day'
									/>
								</div>
								<div className=' col-span-3'>
									<CustomSelect
										options={[
											'January',
											'February',
											'March',
											'April',
											'May',
											'June',
											'July',
											'August',
											'September',
											'October',
											'November',
											'December',
										].map((month) => ({ label: month, value: month }))}
										value={dobMonth}
										onChange={handleDobMonthChange}
										title='Month'
										defaultValue='Month'
									/>
								</div>
								<div className=' col-span-2'>
									<CustomSelect
										options={[...Array(105)].map((_, i) => ({
											label: (i + 1920).toString(),
											value: (i + 1920).toString(),
										}))}
										value={dobYear}
										onChange={handleDobYearChange}
										title='Year'
										defaultValue='Year'
									/>
								</div>
							</div>
						</div>
						{/* End DOB */}

						{/* Start Address */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='email1'
									value='Your address'
									color={addressError ? 'failure' : ''}
								/>
							</div>
							<TextInput
								id='address'
								type='text'
								placeholder='Enter your address'
								required
								color={addressError ? 'failure' : ''}
								value={address}
								onChange={handleAddressChange}
								onBlur={() => setAddressError(address === '')}
								helperText={
									<>
										{addressError && (
											<span className='text-xs'>Please enter your address</span>
										)}
									</>
								}
							/>
						</div>
						{/* End Address */}

						{/* Start City */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='city'
									value='City'
									color={cityError ? 'failure' : ''}
								/>
							</div>
							<TextInput
								id='city'
								type='text'
								placeholder='Enter your city'
								required
								color={cityError ? 'failure' : ''}
								value={city}
								onChange={(e) => setCity(e.target.value)}
								onBlur={() => setCityError(city === '')}
								helperText={
									<>
										{cityError && (
											<span className='text-xs'>Please enter your city</span>
										)}
									</>
								}
							/>
						</div>

						{/* Start State */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='state'
									value='State'
									color={stateError ? 'failure' : ''}
								/>
							</div>
							<TextInput
								id='state'
								type='text'
								placeholder='Enter your state'
								required
								color={stateError ? 'failure' : ''}
								value={state}
								onChange={(e) => setState(e.target.value)}
								onBlur={() => setStateError(state === '')}
								helperText={
									<>
										{stateError && (
											<span className='text-xs'>Please enter your state</span>
										)}
									</>
								}
							/>
						</div>

						{/* Start Zip */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='zip'
									value='Zip'
									color={zipError ? 'failure' : ''}
								/>
							</div>
							<TextInput
								id='zip'
								type='text'
								placeholder='Enter your zip'
								required
								color={zipError ? 'failure' : ''}
								value={zip}
								onChange={(e) => setZip(e.target.value)}
								onBlur={() => setZipError(zip === '')}
								helperText={
									<>
										{zipError && (
											<span className='text-xs'>Please enter your zip</span>
										)}
									</>
								}
							/>
						</div>

						{/* Buttons */}

						<div className=' grid grid-cols-2 gap-4'>
							<Button
								type='submit'
								className='w-full bg-gray-400 hover:bg-icm-green-700 text-gray-800 font-semibold'
								onClick={() => dispatch(handlePrevious(2))}
							>
								Back
							</Button>
							<Button
								type='submit'
								className='w-full bg-icm-green hover:bg-icm-green-700 text-gray-800 font-semibold'
							>
								Next
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default MoreAbout;
