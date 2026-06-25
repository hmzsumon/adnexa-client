import PartnerCards from '@/components/Partnership/PartnerCards';
import Link from 'next/link';
import React from 'react';

const Partnership = () => {
	return (
		<div className=''>
			<div className='bg-white w-full custom-shadow'>
				<div className='partner-banner p-4 md:p-10 bg-no-repeat bg-top bg-cover text-white md:flex justify-between items-center'>
					<div>
						<h3 className='text-3xl font-bold'>Gxness Partnership programs</h3>
						<p className='w-full md:w-2/3 text-xl mt-5'>
							Earn a stable income by introducing clients to a global market
							leader
						</p>
						<Link href={`/program`}>
							<button className='px-6 py-3 mt-5 primary-bg hover:bg-[#FFDA39] rounded font-semibold text-primary duration-300'>
								Start Now
							</button>
						</Link>
					</div>
					<div className='md:space-y-8 space-y-4 mt-10 md:mt-0'>
						<div>
							<p className='text-3xl font-semibold'>10,000</p>
							<p>Partners</p>
						</div>
						<div>
							<p className='text-3xl font-semibold'>$10 MLN</p>
							<p>Paid to the partners</p>
						</div>

						<div>
							<p className='text-3xl font-semibold'>$1 MLN</p>
							<p>Top partner payout per month</p>
						</div>
					</div>
				</div>
				<div className='p-4'>
					<PartnerCards />
				</div>
			</div>
		</div>
	);
};

export default Partnership;
