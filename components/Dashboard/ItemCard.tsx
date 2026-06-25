'use client';

import { Card } from 'flowbite-react';
import React from 'react';
import { FaFilterCircleDollar } from 'react-icons/fa6';
import { formatBalance } from '@/lib/functions';

const ItemCard = ({ icon, title, balance }: any) => {
	return (
		<div>
			<Card className=' w-full bg-transparent'>
				<div className=' flex gap-4 items-center'>
					<div>
						<h5 className='text-xl font-semibold tracking-tight text-gray-200 dark:text-white'>
							{title}
						</h5>
						<p className='font-normal text-gray-200 dark:text-gray-400'>
							{Number(balance ? balance : 0).toFixed(4)} USDT
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ItemCard;
