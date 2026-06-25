import ContactUsBanner from '@/components/Contact/ContactUsBanner';
import React from 'react';
import { Card } from 'flowbite-react';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
const ContactUs = () => {
	return (
		<div>
			<ContactUsBanner />
			<div className='py-8'>
				{/* Start Upper */}
				<div className=' px-4 w-full md:w-9/12 mx-auto'>
					<h2 className=' text-2xl text-gray-800 md:text-center font-bold'>
						Have a question or require specialist assistance? Our dedicated
						customer service team is here 24/7 to assist you.
					</h2>
					<div className=' grid md:grid-cols-2 gap-4 my-8'>
						<Card>
							<div className=' flex items-center justify-center'>
								<Card className=' w-20 h-20 rounded-full  flex items-center justify-center'>
									<BiSolidPhoneCall className=' text-icm-green text-3xl' />
								</Card>
							</div>
							<h2 className=' text-2xl font-bold text-gray-800 text-center'>
								Call Us
							</h2>
							<div className=' list-none'>
								<li className=' text-center flex flex-col'>
									<span>
										General:{' '}
										<a
											className='text-gray-800 font-bold'
											href='tel:+234-547-456-3245'
										>
											+1(226)906-0895
										</a>
									</span>
									<small className=' text-xs'>
										(International charges may apply)
									</small>
								</li>
							</div>
						</Card>
						<Card>
							<div className=' flex items-center justify-center'>
								<Card className=' w-20 h-20 rounded-full  flex items-center justify-center'>
									<MdEmail className=' text-icm-green text-3xl' />
								</Card>
							</div>
							<h2 className=' text-2xl font-bold text-gray-800 text-center'>
								Email Enquiries
							</h2>
							<div className=' list-none'>
								<li className=' text-center '>
									<span className='font-bold text-xs text-gray-800'>
										Support:{' '}
										<a
											className='text-gray-500 font-semibold '
											href='mailto:support@icmmoney.com'
										>
											support@icmmoney.com
										</a>
									</span>
								</li>
								<li className=' text-center flex flex-col'>
									<span className='font-bold text-xs text-gray-800'>
										Accounts:{' '}
										<a
											className='text-gray-500 font-semibold '
											href='mailto:accounts@icmmoney.com'
										>
											accounts@icmmoney.com
										</a>
									</span>
								</li>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
