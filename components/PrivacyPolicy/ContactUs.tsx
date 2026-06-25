'use client';
import Link from 'next/link';
import { FaRegDotCircle } from 'react-icons/fa';

const ContactUs = () => {
	return (
		<div className='w-full md:max-w-sm shadow-2xl rounded-lg'>
			<div className=' p-4 '>
				<div className=''>
					<h2 className=' text-2xl text-gray-700 font-bold'>Contact Us</h2>
					<p className=' text-gray-500 text-sm'>
						We are here 24hrs a day Monday to Sunday
					</p>
				</div>
			</div>
			<hr />
			<div className=' p-4'>
				<Link href='/contact-us'>
					<li className=' list-none flex items-center  gap-2'>
						<FaRegDotCircle className='inline-block text-icm-green' />
						<span className='text-gray-700 text-sm font-bold'>Help Center</span>
					</li>
				</Link>
			</div>
			<hr />
			<div className=' p-4'>
				<li className=' list-none flex items-center  gap-2'>
					<FaRegDotCircle className='inline-block text-icm-green' />
					{/* Email Us */}
					<a
						href='mailto:support@icmmoney.com'
						className='text-gray-700 text-sm font-bold'
					>
						Email Us
					</a>
				</li>
			</div>
		</div>
	);
};

export default ContactUs;
