'use client';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { createUTCDateOfBirth } from '@/lib/functions';
import { Card } from 'flowbite-react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdArrowDropDown } from 'react-icons/md';
import CustomSelect from '../CustomSelect';
import { useSelector, useDispatch } from 'react-redux';
import { setStep } from '@/redux/verificationSlice';
import { useMyAddressQuery } from '@/redux/features/auth/authApi';
import { useCreateVerifyStep01Mutation } from '@/redux/features/kyc/kycApi';

// country options
const countries = [
	{ label: 'Afghanistan', value: 'Afghanistan' },
	{ label: 'Albania', value: 'Albania' },
	{ label: 'Algeria', value: 'Algeria' },
	{ label: 'Andorra', value: 'Andorra' },
	{ label: 'Angola', value: 'Angola' },
	{ label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
	{ label: 'Argentina', value: 'Argentina' },
	{ label: 'Armenia', value: 'Armenia' },
	{ label: 'Australia', value: 'Australia' },
	{ label: 'Austria', value: 'Austria' },
	{ label: 'Azerbaijan', value: 'Azerbaijan' },
	{ label: 'Bahamas', value: 'Bahamas' },
	{ label: 'Bahrain', value: 'Bahrain' },
	{ label: 'Bangladesh', value: 'Bangladesh' },
	{ label: 'Barbados', value: 'Barbados' },
	{ label: 'Belarus', value: 'Belarus' },
	{ label: 'Belgium', value: 'Belgium' },
	{ label: 'Belize', value: 'Belize' },
	{ label: 'Benin', value: 'Benin' },
	{ label: 'Bhutan', value: 'Bhutan' },
	{ label: 'Bolivia', value: 'Bolivia' },
	{ label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
	{ label: 'Botswana', value: 'Botswana' },
	{ label: 'Brazil', value: 'Brazil' },
	{ label: 'Brunei', value: 'Brunei' },
	{ label: 'Bulgaria', value: 'Bulgaria' },
	{ label: 'Burkina Faso', value: 'Burkina Faso' },
	{ label: 'Burundi', value: 'Burundi' },
	{ label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
	{ label: 'Cabo Verde', value: 'Cabo Verde' },
	{ label: 'Cambodia', value: 'Cambodia' },
	{ label: 'Cameroon', value: 'Cameroon' },
	{ label: 'Canada', value: 'Canada' },
	{ label: 'Central African Republic', value: 'Central African Republic' },
	{ label: 'Chad', value: 'Chad' },
	{ label: 'Chile', value: 'Chile' },
	{ label: 'China', value: 'China' },
	{ label: 'Colombia', value: 'Colombia' },
	{ label: 'Comoros', value: 'Comoros' },
	{ label: 'Congo (Congo-Brazzaville)', value: 'Congo (Congo-Brazzaville)' },
	{ label: 'Costa Rica', value: 'Costa Rica' },
	{ label: 'Croatia', value: 'Croatia' },
	{ label: 'Cuba', value: 'Cuba' },
	{ label: 'Cyprus', value: 'Cyprus' },
	{ label: 'Czechia (Czech Republic)', value: 'Czechia (Czech Republic)' },
	{
		label: 'Democratic Republic of the Congo',
		value: 'Democratic Republic of the Congo',
	},
	{ label: 'Denmark', value: 'Denmark' },
	{ label: 'Djibouti', value: 'Djibouti' },
	{ label: 'Dominica', value: 'Dominica' },
	{ label: 'Dominican Republic', value: 'Dominican Republic' },
	{ label: 'Ecuador', value: 'Ecuador' },
	{ label: 'Egypt', value: 'Egypt' },
	{ label: 'El Salvador', value: 'El Salvador' },
	{ label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
	{ label: 'Eritrea', value: 'Eritrea' },
	{ label: 'Estonia', value: 'Estonia' },
	{
		label: 'Eswatini (fmr. "Swaziland")',
		value: 'Eswatini (fmr. "Swaziland")',
	},
	{ label: 'Ethiopia', value: 'Ethiopia' },
	{ label: 'Fiji', value: 'Fiji' },
	{ label: 'Finland', value: 'Finland' },
	{ label: 'France', value: 'France' },
	{ label: 'Gabon', value: 'Gabon' },
	{ label: 'Gambia', value: 'Gambia' },
	{ label: 'Georgia', value: 'Georgia' },
	{ label: 'Germany', value: 'Germany' },
	{ label: 'Ghana', value: 'Ghana' },
	{ label: 'Greece', value: 'Greece' },
	{ label: 'Grenada', value: 'Grenada' },
	{ label: 'Guatemala', value: 'Guatemala' },
	{ label: 'Guinea', value: 'Guinea' },
	{ label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
	{ label: 'Guyana', value: 'Guyana' },
	{ label: 'Haiti', value: 'Haiti' },
	{ label: 'Holy See', value: 'Holy See' },
	{ label: 'Honduras', value: 'Honduras' },
	{ label: 'Hungary', value: 'Hungary' },
	{ label: 'Iceland', value: 'Iceland' },
	{ label: 'India', value: 'India' },
	{ label: 'Indonesia', value: 'Indonesia' },
	{ label: 'Iran', value: 'Iran' },
	{ label: 'Iraq', value: 'Iraq' },
	{ label: 'Ireland', value: 'Ireland' },
	{ label: 'Isle of Man', value: 'Isle of Man ' },
	{ label: ' Israel', value: 'Israel' },
	{ label: 'Italy', value: 'Italy' },
	{ label: 'Jamaica', value: 'Jamaica' },
	{ label: 'Japan', value: 'Japan' },
	{ label: 'Jordan', value: 'Jordan' },
	{ label: 'Kazakhstan', value: 'Kazakhstan' },
	{ label: 'Kenya', value: 'Kenya' },
	{ label: 'Kiribati', value: 'Kiribati' },
	{ label: 'Kuwait', value: 'Kuwait' },
	{ label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
	{ label: 'Laos', value: 'Laos' },
	{ label: 'Latvia', value: 'Latvia' },
	{ label: 'Lebanon', value: 'Lebanon' },
	{ label: 'Lesotho', value: 'Lesotho' },
	{ label: 'Liberia', value: 'Liberia' },
	{ label: 'Libya', value: 'Libya' },
	{ label: 'Liechtenstein', value: 'Liechtenstein' },
	{ label: 'Lithuania', value: 'Lithuania' },
	{ label: 'Luxembourg', value: 'Luxembourg' },
	{ label: 'Madagascar', value: 'Madagascar' },
	{ label: 'Malawi', value: 'Malawi' },
	{ label: 'Malaysia', value: 'Malaysia' },
	{ label: 'Maldives', value: 'Maldives' },
	{ label: 'Mali', value: 'Mali' },
	{ label: 'Malta', value: 'Malta' },
	{ label: 'Marshall Islands', value: 'Marshall Islands' },
	{ label: 'Mauritania', value: 'Mauritania' },
	{ label: 'Mauritius', value: 'Mauritius' },
	{ label: 'Mexico', value: 'Mexico' },
	{ label: 'Micronesia', value: 'Micronesia' },
	{ label: 'Moldova', value: 'Moldova' },
	{ label: 'Monaco', value: 'Monaco' },
	{ label: 'Mongolia', value: 'Mongolia' },
	{ label: 'Montenegro', value: 'Montenegro' },
	{ label: 'Morocco', value: 'Morocco' },
	{ label: 'Mozambique', value: 'Mozambique' },
	{ label: 'Myanmar', value: 'Myanmar' },
	{ label: 'Namibia', value: 'Namibia' },
	{ label: 'Nauru', value: 'Nauru' },
	{ label: 'Nepal', value: 'Nepal' },
	{ label: 'Netherlands', value: 'Netherlands' },
	{ label: 'New Zealand', value: 'New Zealand' },
	{ label: 'Nicaragua', value: 'Nicaragua' },
	{ label: 'Niger', value: 'Niger' },
	{ label: 'Nigeria', value: 'Nigeria' },
	{ label: 'North Korea', value: 'North Korea' },
	{ label: 'North Macedonia', value: 'North Macedonia' },
	{ label: 'Norway', value: 'Norway' },
	{ label: 'Oman', value: 'Oman' },
	{ label: 'Pakistan', value: 'Pakistan' },
	{ label: 'Palau', value: 'Palau' },
	{ label: 'Panama', value: 'Panama' },
	{ label: 'Papua New Guinea', value: 'Papua New Guinea' },
	{ label: 'Paraguay', value: 'Paraguay' },
	{ label: 'Peru', value: 'Peru' },
	{ label: 'Philippines', value: 'Philippines' },
	{ label: 'Poland', value: 'Poland' },
	{ label: 'Portugal', value: 'Portugal' },
	{ label: 'Qatar', value: 'Qatar' },
	{ label: 'Romania', value: 'Romania' },
	{ label: 'Russia', value: 'Russia' },
	{ label: 'Rwanda', value: 'Rwanda' },
	{ label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
	{ label: 'Saint Lucia', value: 'Saint Lucia' },
	{
		label: 'Saint Vincent and the Grenadines',
		value: 'Saint Vincent and the Grenadines',
	},
	{ label: 'Samoa', value: 'Samoa' },
	{ label: 'San Marino', value: 'San Marino' },
	{ label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
	{ label: 'Saudi Arabia', value: 'Saudi Arabia' },
	{ label: 'Senegal', value: 'Senegal' },
	{ label: 'Serbia', value: 'Serbia' },
	{ label: 'Seychelles', value: 'Seychelles' },
	{ label: 'Sierra Leone', value: 'Sierra Leone' },
	{ label: 'Singapore', value: 'Singapore' },
	{ label: 'Slovakia', value: 'Slovakia' },
	{ label: 'Slovenia', value: 'Slovenia' },
	{ label: 'Solomon Islands', value: 'Solomon Islands' },
	{ label: 'Somalia', value: 'Somalia' },
	{ label: 'South Africa', value: 'South Africa' },
	{ label: 'South Korea', value: 'South Korea' },
	{ label: 'South Sudan', value: 'South Sudan' },
	{ label: 'Spain', value: 'Spain' },
	{ label: 'Sri Lanka', value: 'Sri Lanka' },
	{ label: 'Sudan', value: 'Sudan' },
	{ label: 'Suriname', value: 'Suriname' },
	{ label: 'Sweden', value: 'Sweden' },
	{ label: 'Switzerland', value: 'Switzerland' },
	{ label: 'Syria', value: 'Syria' },
	{ label: 'Tajikistan', value: 'Tajikistan' },
	{ label: 'Tanzania', value: 'Tanzania' },
	{ label: 'Thailand', value: 'Thailand' },
	{ label: 'Timor-Leste', value: 'Timor-Leste' },
	{ label: 'Togo', value: 'Togo' },
	{ label: 'Tonga', value: 'Tonga' },
	{ label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
	{ label: 'Tunisia', value: 'Tunisia' },
	{ label: 'Turkey', value: 'Turkey' },
	{ label: 'Turkmenistan', value: 'Turkmenistan' },
	{ label: 'Tuvalu', value: 'Tuvalu' },
	{ label: 'Uganda', value: 'Uganda' },
	{ label: 'Ukraine', value: 'Ukraine' },
	{ label: 'United Arab Emirates', value: 'United Arab Emirates' },
	{ label: 'United Kingdom', value: 'United Kingdom' },
	{ label: 'United States', value: 'United States' },
	{ label: 'Uruguay', value: 'Uruguay' },
	{ label: 'Uzbekistan', value: 'Uzbekistan' },
	{ label: 'Vanuatu', value: 'Vanuatu' },
	{ label: 'Venezuela', value: 'Venezuela' },
	{ label: 'Vietnam', value: 'Vietnam' },
	{ label: 'Yemen', value: 'Yemen' },
	{ label: 'Zambia', value: 'Zambia' },
	{ label: 'Zimbabwe', value: 'Zimbabwe' },
];

const PersonalInfo: React.FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isSuccess, isError, error } =
		useMyAddressQuery(undefined);

	const { address: myAddress } = data || { address: '' };

	const [
		createVerifyStep01,
		{
			isLoading: kycLoading,
			isSuccess: kycIsSuccess,
			isError: kycIsError,
			error: kycError,
		},
	] = useCreateVerifyStep01Mutation();

	// extract day, month and year from user.dateOfBirth
	useEffect(() => {
		if (user?.dateOfBirth) {
			const date = new Date(user.dateOfBirth);
			setDobDay(date.getDate().toString());
			setDobMonth(date.toLocaleString('default', { month: 'long' }));
			setDobYear(date.getFullYear().toString());
		}
	}, [user?.dateOfBirth]);

	const [fullName, setFullName] = useState<string>(user?.name || '');
	const [gender, setGender] = useState<string>('male' || '');
	const [dobDay, setDobDay] = useState<string>('');
	const [dobMonth, setDobMonth] = useState<string>('');
	const [dobYear, setDobYear] = useState<string>('');
	const [phone, setPhone] = useState<string>(user?.mobile || '');
	const [country, setCountry] = useState<string>(
		user?.country || 'United States'
	);
	const [city, setCity] = useState<string>(user?.address.city || '');
	const [zip, setZip] = useState<string>(user?.address.zip || '');
	const [address, setAddress] = useState<string>(user?.address.address || '');

	const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFullName(e.target.value);
	};

	const handleGenderChange = (value: string) => {
		setGender(value);
	};

	const handleDobDayChange = (value: string) => {
		setDobDay(value);
	};

	const handleDobMonthChange = (value: string) => {
		setDobMonth(value);
	};

	const handleDobYearChange = (value: string) => {
		setDobYear(value);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};

	const handleCountryChange = (value: string) => {
		setCountry(value);
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	};

	const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setZip(e.target.value);
	};

	const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAddress(e.target.value);
	};

	// handle form submission
	const handleSubmit = (e: any) => {
		e.preventDefault();
		// create date of birth utc string
		const dob = createUTCDateOfBirth(dobDay, dobMonth, dobYear);

		const data = {
			fullName,
			gender,
			dob,
			phone,
			country,
			city,
			zip,
			address,
		};
		console.log(data);
		createVerifyStep01(data);
	};

	useEffect(() => {
		if (kycIsSuccess) {
			toast.success('Personal information saved successfully');
			dispatch(setStep(2));
		}

		if (kycIsError) {
			toast.error((kycError as fetchBaseQueryError).data?.message);
		}
	}, [kycIsSuccess, kycIsError, kycError]);

	return (
		<div className='container mx-auto my-4 text-gray-600'>
			<Card>
				<h2 className='text-2xl font-semibold mb-4'>Personal Information</h2>
				<form className='space-y-4' onSubmit={handleSubmit}>
					{/* Start Name and gender */}
					<div className=' grid grid-cols-3 gap-2'>
						<div className=' col-span-2'>
							<label className='block mb-1'>Full Name:</label>
							<input
								type='text'
								className='border border-gray-300 rounded px-3 py-2 w-full'
								value={fullName}
								onChange={handleFullNameChange}
							/>
						</div>

						<div className=' col-span-1'>
							<label className='block mb-1'>Gender:</label>
							<CustomSelect
								options={[
									{ label: 'Male', value: 'Male' },
									{ label: 'Female', value: 'Female' },
									{ label: 'Other', value: 'Other' },
								]}
								value={gender}
								onChange={handleGenderChange}
								title='Gender'
								defaultValue='Male'
							/>
						</div>
					</div>

					{/* End Name and gender */}

					{/* Start DOB */}
					<div className=''>
						<label className='block mb-1'>Date of Birth:</label>
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
					<div>
						<label className='block mb-1'>Phone:</label>
						<input
							type='text'
							className='border border-gray-300 rounded px-3 py-2 w-full'
							value={phone}
							onChange={handlePhoneChange}
						/>
					</div>

					<hr className='border-t border-gray-300 my-2' />

					{/* Start Address */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold mb-2'>Residential Address:</h3>
						<div>
							<label className='block mb-1'>Country:</label>
							<CustomSelect
								options={countries}
								value={country}
								onChange={handleCountryChange}
								title='Country'
								defaultValue='Country'
							/>
						</div>
						<div>
							<label className='block mb-1'>City:</label>
							<input
								type='text'
								className='border border-gray-300 rounded px-3 py-2 w-full'
								value={city}
								onChange={handleCityChange}
							/>
						</div>
						<div>
							<label className='block mb-1'>Zip:</label>
							<input
								type='text'
								className='border border-gray-300 rounded px-3 py-2 w-full'
								value={zip}
								onChange={handleZipChange}
							/>
						</div>
						<div>
							<label className='block mb-1'>Address:</label>
							<textarea
								className='border border-gray-300 rounded px-3 py-2 w-full'
								rows={3}
								value={address}
								onChange={handleAddressChange}
							></textarea>
						</div>
					</div>
					<div className=' flex justify-end'>
						<button
							type='submit'
							className='bg-icm-green text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-fit'
						>
							Next
							<FaArrowRightLong />
						</button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default PersonalInfo;
