'use client';

import { IconType } from 'react-icons';

export type MetricCardProps = {
	title: string;
	value: string;
	trend?: string;
	variant?: 'green' | 'purple' | 'blue' | 'orange' | 'pink';
	icon: IconType;
};

const variantClass = {
	green: 'from-emerald-500/25 to-cyan-500/10 text-emerald-300 border-emerald-400/20',
	purple: 'from-violet-500/25 to-fuchsia-500/10 text-violet-300 border-violet-400/20',
	blue: 'from-blue-500/25 to-cyan-500/10 text-sky-300 border-sky-400/20',
	orange: 'from-amber-500/25 to-orange-500/10 text-amber-300 border-amber-400/20',
	pink: 'from-fuchsia-500/25 to-pink-500/10 text-fuchsia-300 border-fuchsia-400/20',
};

const MetricCard = ({ title, value, trend, variant = 'purple', icon: Icon }: MetricCardProps) => {
	return (
		<div className='adnexa-glass-card rounded-[24px] p-4'>
			{/* ────────── Metric Icon ────────── */}
			<div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${variantClass[variant]}`}>
				<Icon className='text-2xl' />
			</div>

			{/* ────────── Metric Content ────────── */}
			<p className='text-sm text-slate-400'>{title}</p>
			<h3 className='mt-1 text-xl font-black text-white'>{value}</h3>
			{trend && (
				<span className='mt-3 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300'>
					↗ {trend}
				</span>
			)}
		</div>
	);
};

export default MetricCard;
