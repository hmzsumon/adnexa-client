'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';
import { HiSparkles } from 'react-icons/hi2';

type EmptyStateProps = {
	title: string;
	subtitle: string;
	actionLabel?: string;
	actionHref?: string;
	icon?: IconType;
};

const EmptyState = ({ title, subtitle, actionLabel, actionHref, icon: Icon = HiSparkles }: EmptyStateProps) => {
	return (
		<div className='adnexa-glass-card flex min-h-[280px] flex-col items-center justify-center rounded-[32px] p-8 text-center'>
			{/* ────────── Empty State Icon ────────── */}
			<div className='flex h-20 w-20 items-center justify-center rounded-[28px] border border-violet-400/30 bg-violet-500/15 text-violet-300 shadow-[0_0_35px_rgba(139,92,246,.25)]'>
				<Icon className='text-4xl' />
			</div>

			{/* ────────── Empty State Text ────────── */}
			<h3 className='mt-5 text-2xl font-black text-white'>{title}</h3>
			<p className='mt-2 max-w-xs text-sm leading-6 text-slate-400'>{subtitle}</p>

			{/* ────────── Empty State Action ────────── */}
			{actionLabel && actionHref && (
				<Link href={actionHref} className='mt-6 rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-teal-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/30'>
					{actionLabel}
				</Link>
			)}
		</div>
	);
};

export default EmptyState;
