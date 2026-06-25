import { SiBinance } from 'react-icons/si';
import { Card } from 'flowbite-react';
import { formDateWithDayMonthTime, formatBalance } from '@/lib/functions';

const HistoryCard = ({ transaction }: any) => {
	const { amount, createdAt, sourceAddress, is_approved } = transaction;
	return (
		<div className='my-2'>
			{/* Done Status */}
			<Card className=''>
				<div className=' flex items-center justify-between'>
					<h2 className=' font-semibold'>
						<span className='text-icm-green'>Deposit</span> USDT
					</h2>
					{is_approved && (
						<div className=' bg-gray-300 px-2 rounded'>
							<span className='text-green-500 font-bold'>Completed</span>
						</div>
					)}
				</div>

				<div className=' flex items-center justify-between'>
					<p>
						<span className='font-semibold'>Amount</span>
					</p>
					<p className='text-green-500 font-semibold flex items-center gap-1'>
						<SiBinance className='text-blue-500' />
						{formatBalance(amount)} USDT
					</p>
				</div>

				<div className=' flex items-center justify-between'>
					<p className='text-primary font-medium'>Date</p>
					<p>{formDateWithDayMonthTime(createdAt)}</p>
				</div>

				<div className=' flex items-center justify-between'>
					<p className='font-medium'>Order ID</p>
					<p>{sourceAddress}</p>
				</div>
			</Card>
		</div>
	);
};

export default HistoryCard;
