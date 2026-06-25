'use client';
import { Card } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { MdCall, MdEmail, MdKeyboardArrowRight } from 'react-icons/md';
import IcmIcon from '../IcmIcon';

const ContactInfo = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div>
			<Card href='#' className='w-full'>
				<div className=' flex items-center justify-between'>
					<h3 className=' text-primary font-semibold'>Contact Info</h3>
					{/* <h5 className=' text-blue-500 tracking-tight'>Edit</h5> */}
				</div>
				{/* Email */}
				<Card>
					<div className=' list-none flex items-center justify-between'>
						<li className=' flex items-center gap-2'>
							<IcmIcon icon={<MdEmail />} />

							<span className='text-primary tracking-tight font-semibold'>
								{user?.email}
							</span>
						</li>
						<li className='text-xl text-primary '>
							<MdKeyboardArrowRight />
						</li>
					</div>
				</Card>
				{/* Phone */}
				<Card>
					<div className=' list-none flex items-center justify-between'>
						<li className=' flex items-center gap-2'>
							<IcmIcon icon={<MdCall />} />
							<span className='text-primary tracking-tight font-semibold'>
								{user?.phone}
							</span>
						</li>
						<li className=' text-primary text-xl'>
							<MdKeyboardArrowRight />
						</li>
					</div>
				</Card>
			</Card>
		</div>
	);
};

export default ContactInfo;
