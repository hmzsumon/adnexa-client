'use client';

import Link from 'next/link';
import { HiBolt } from 'react-icons/hi2';

type AppBrandProps = {
	compact?: boolean;
};

const AppBrand = ({ compact = false }: AppBrandProps) => {
	return (
		<Link href='/dashboard' className='flex items-center justify-center gap-3'>
			{/* ────────── App Icon ────────── */}
			<div
				className={`${
					compact ? 'h-10 w-10' : 'h-14 w-14'
				} adnexa-icon-box flex shrink-0 items-center justify-center`}
			>
				<HiBolt className={`${compact ? 'text-2xl' : 'text-3xl'} text-cyan-300`} />
			</div>

			{/* ────────── Brand Text ────────── */}
			<div className='leading-tight'>
				<h1 className={`${compact ? 'text-xl' : 'text-3xl'} font-black tracking-tight text-white`}>
					Ad<span className='adnexa-gradient-text'>nexa</span>
				</h1>
				<p className='text-xs font-medium text-slate-400'>Invest. Earn. Grow.</p>
			</div>
		</Link>
	);
};

export default AppBrand;
