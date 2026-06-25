import { FaDollarSign, FaRegCircleQuestion } from 'react-icons/fa6';
import { Card } from 'flowbite-react';
import { RxAvatar } from 'react-icons/rx';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdOutlineVerified } from 'react-icons/md';

const TopCard = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div className=' '>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-2 '>
				{/* Verification */}
				{user?.kyc_verified ? (
					<Card className=''>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<span className='text-2xl p-2  border-4 rounded-full text-black'>
									<RxAvatar />
								</span>
								<div className='space-y-1'>
									<p className='text-[12px] font-medium text-primary'>
										Verification status
									</p>
									<p className='text-icm-green flex items-center gap-1  font-semibold'>
										<MdOutlineVerified className='text-xl' /> Verified
									</p>
								</div>
							</div>

							<button
								className='rounded py-2 px-4 text-sm font-semibold bg-green-500  text-slate-700 duration-300 '
								disabled
							>
								Complete
							</button>
						</div>
					</Card>
				) : (
					<Card className=''>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<span className='text-2xl p-2  border-4 rounded-full text-black'>
									<RxAvatar />
								</span>
								<div className='space-y-1'>
									<p className='text-[12px] font-medium text-primary'>
										Verification status
									</p>
									<p className='text-[#C0424D] text-lg font-semibold'>
										Not verified
									</p>
									<p className='text-[12px]'>
										{user?.kyc_step}/4 steps complete
									</p>
								</div>
							</div>
							{user?.kyc_step === 4 ? (
								<button className='rounded py-2 px-4 text-sm font-semibold  bg-orange-400 text-slate-700 duration-300 hover:bg-orange-300'>
									Under Review
								</button>
							) : (
								<Link href='/verification'>
									<button className='rounded py-2 px-4 text-sm font-semibold bg-green-500  text-slate-700 duration-300 hover:bg-icm-green'>
										Complete Now
									</button>
								</Link>
							)}
						</div>
					</Card>
				)}
				{/* balance */}
				<Card>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<span className='text-2xl p-2  border-4 rounded-full text-black'>
								<FaDollarSign />
							</span>
							<div className='space-y-1'>
								<p
									data-tooltip-id='unavialble'
									data-tooltip-content='This is the maximum amount you can currently deposit. Once you reach the limit, you will not be able to deposit or receive internal transfers. Withdrawals will remain available.'
									data-tooltip-place='bottom'
									data-tooltip-class-name='custom-tooltip'
									className='text-[12px] font-medium text-primary w-[fit-content] flex items-center gap-1 cursor-default select-none'
								>
									Withdraw limit
									<span>
										<FaRegCircleQuestion />
									</span>
									<Tooltip id='unavialble' />
								</p>
								<p className='text-lg font-semibold'>20,000 USD</p>
								<p className='text-[12px]'>
									Verify your account to unlock limits
								</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default TopCard;
