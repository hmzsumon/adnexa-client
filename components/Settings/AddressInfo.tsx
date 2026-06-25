'use client';
import React from 'react';
import { Card } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { MdCall, MdEmail, MdKeyboardArrowRight } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import IcmIcon from '../IcmIcon';
import { useMyAddressQuery } from '@/redux/features/auth/authApi';

const AddressInfo = () => {
	const { data, isLoading } = useMyAddressQuery(undefined);
	const { address } = data || {};
	console.log('address', address);
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div>
			<Card href='#' className='w-full'>
				<div className=' flex items-center justify-between'>
					<h3 className=' text-primary font-semibold'>Address Info</h3>
					{/* <h5 className=' text-blue-500 tracking-tight text-sm'>Edit</h5> */}
				</div>

				{/* Address */}
				<Card>
					<div className=' list-none flex items-center justify-between'>
						<li className=' flex items-center gap-3'>
							<IcmIcon icon={<FaHome />} />
							<div className=' leading-4'>
								<p className='text-primary tracking-tight font-semibold'>
									{address?.address}
								</p>
								<small className=' text-[.70rem] text-primary tracking-tight'>
									Address
								</small>
							</div>
						</li>
						<li className='text-xl text-primary '>
							<MdKeyboardArrowRight />
						</li>
					</div>
				</Card>
				{/* City */}
				<Card>
					<div className=' list-none flex items-center justify-between'>
						<li className=' flex items-center gap-3'>
							<IcmIcon icon={<MdOutlineLocationOn />} />
							<div className=' leading-4'>
								<p className='text-primary tracking-tight font-semibold'>
									{address?.city}
								</p>
								<small className=' text-[.70rem] text-primary tracking-tight'>
									Current City
								</small>
							</div>
						</li>
						<li className='text-xl text-primary '>
							<MdKeyboardArrowRight />
						</li>
					</div>
				</Card>
				{/* Country */}
				<Card>
					<div className=' list-none flex items-center justify-between'>
						<li className=' flex items-center gap-3'>
							<IcmIcon icon={<MdOutlineLocationOn />} />
							<div className=' leading-4'>
								<p className='text-primary tracking-tight font-semibold'>
									{address?.country}
								</p>
								<small className=' text-[.70rem] text-primary tracking-tight'>
									Country
								</small>
							</div>
						</li>
						<li className='text-xl text-primary '>
							<MdKeyboardArrowRight />
						</li>
					</div>
				</Card>
			</Card>
		</div>
	);
};

export default AddressInfo;
