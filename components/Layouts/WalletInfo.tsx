import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import React from 'react';
import { useSelector } from 'react-redux';

const WalletInfo = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div className='dropdown hidden lg:block  w-full'>
			<div
				tabIndex={0}
				role='button'
				className='focus:bg-[#363d42] focus:text-[#FFCF01] rounded-none flex items-center gap-3 p-5 top-nav-item text-[1.5rem]'
			>
				{Number(user?.m_balance).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}{' '}
				USDT
			</div>
			<ul
				tabIndex={0}
				className='p-5 dropdown-bg bg-icm-black-2 dropdown-content rounded-none w-[fit-content] h-[fit-content] z-[1] space-y-7 text-left mt-0'
			>
				<div className='my-3'>
					<p className='text-sm text-nowrap text-white'>Trading account</p>
					<p className='text-[8px] text-slate-300'>#145683519</p>
					<p className='text-white uppercase text-lg font-semibold'>
						0.00 USDT
					</p>
				</div>
				<div className='flex items-center gap-5 mt-3 mb-3'>
					<button className='rounded py-2 px-16 primary-border primary-color'>
						Transfer
					</button>
					<button className='rounded py-2 px-16 primary-border primary-color'>
						Withdraw
					</button>
				</div>
				<div className='h-[0.5px] bg-slate-600 w-full'></div>
				<div className='my-3'>
					<p className='text-sm text-nowrap text-white'>Investment wallet</p>
					<p className='text-[8px] text-slate-300'>#301158329</p>
					<p className='text-white uppercase text-lg font-semibold'>
						0.00 USDT
					</p>
				</div>
			</ul>
		</div>
	);
};

export default WalletInfo;
