'use client';
import CopyToClipboard from '@/lib/CopyToClipboard';
import React from 'react';
import { FaQrcode } from 'react-icons/fa';
import { ImUserPlus } from 'react-icons/im';
import { PiWarningLight } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';

const Referral = () => {
	const { user } = useSelector((state: any) => state.auth);
	// get host
	const host = window.location.host;
	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/register?partner_code=${user?.partner_id}`;
	} else {
		referralLink = `https://${host}/register?partner_code=${user?.partner_id}`;
	}
	// short referral link
	const shortReferralLink = referralLink.slice(0, 22) + '...';
	return (
		<div className='py-4'>
			<h3 className='text-xl text-slate-800 font-semibold'>Referral</h3>
			<h3 className=' text-slate-800 font-semibold py-3'>
				Invite your friends and earn 10% of their earnings
			</h3>
			<div className='border px-2 my-10 rounded-sm'>
				<div className='py-5'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='uppercase md:mb-0 mb-5 text-lg text-slate-600'>
								<span className='font-semibold text-xl text-black'>0</span>{' '}
								Total Referrals
							</p>
						</div>
					</div>
					<div className='secondary-bg p-3 rounded-lg border border-gray-400 mt-2'>
						<div className='flex items-center justify-between gap-2 text-gray-700 font-semibold'>
							<span className='font-semibold'>Referral code:</span>
							<div className='flex items-center'>
								<p className='text-sm'>
									<span>{user?.partner_id}</span>
								</p>
								<CopyToClipboard text={user?.partner_id} />
							</div>
						</div>
					</div>
					<div className='secondary-bg p-3 rounded-lg border border-gray-400 mt-4'>
						<div className='flex items-center justify-between gap-2 text-gray-700 font-semibold'>
							<span className=' font-semibold'>Referral Link:</span>
							<div className='flex'>
								<p className='text-sm'>
									<span>{shortReferralLink}</span>
								</p>
								<CopyToClipboard text={referralLink} />
							</div>
						</div>
					</div>

					<div className='flex items-center grid-cols-8 gap-4 mt-4 '>
						<RWebShare data={{ url: referralLink }}>
							<div className='relative flex-1 col-span-7 p-3 bg-icm-green cursor-pointer rounded-xl'>
								<div>
									<h2 className='text-xl font-bold text-center text-gray-100 '>
										Invite Friend{' '}
									</h2>
								</div>
							</div>
						</RWebShare>
						<div className='flex items-center justify-center col-span-1 p-4 bg-[#474D57] rounded-xl'>
							<FaQrcode className='inline-block text-xl text-gray-400 cursor-pointer ' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Referral;
