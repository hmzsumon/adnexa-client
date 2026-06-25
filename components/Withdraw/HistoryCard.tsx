'use client';
import { SiBinance } from 'react-icons/si';
import { Card } from 'flowbite-react';
import { formDateWithDayMonthTime, formatBalance } from '@/lib/functions';

const WithdrawHistoryCard = ({ withdraw }: any) => {
	const { amount, createdAt, _id, is_approved, status } = withdraw;
	return (
		<div className='my-2'>
			{/* Done Status */}
			<Card className=''>
				<div className=' flex items-center justify-between'>
					<h2 className=' font-semibold'>
						<span className='text-orange-500'>Withdraw</span> USDT
					</h2>
					{is_approved && (
						<div className=' bg-gray-300 px-2 rounded'>
							<span className='text-green-500 font-bold'>Completed</span>
						</div>
					)}
					{!is_approved && (
						<div className=' bg-gray-300 px-2 rounded'>
							<span className='text-red-500 font-bold'>Pending</span>
						</div>
					)}
				</div>

				<div className=' flex items-center justify-between'>
					<p>
						<span className='font-semibold'>Amount</span>
					</p>
					<p className='text-green-500 font-semibold flex items-center gap-1'>
						{/* <SiBinance className='text-blue-500' /> */}
						{formatBalance(amount)} USDT
					</p>
				</div>

				<div className=' flex items-center justify-between'>
					<p className='text-primary font-medium'>Date</p>
					<p>{formDateWithDayMonthTime(createdAt)}</p>
				</div>

				<div className=' flex items-center justify-between'>
					<p className='font-medium'>Order ID</p>
					<p>{_id}</p>
				</div>
			</Card>
		</div>
	);
};

export default WithdrawHistoryCard;
