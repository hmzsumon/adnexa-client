'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { HiChevronRight, HiLockClosed, HiSparkles } from 'react-icons/hi2';

type MethodCardProps = {
	title: string;
	statusLabel: string;
	isActive: boolean;
	href: string;
	icon?: ReactNode;
	image?: string | null;
	accent?: 'teal' | 'violet' | 'blue' | 'amber' | 'pink';
	children: ReactNode;
};

const accentClass = {
	teal: 'border-teal-400/25 from-teal-500/18 to-cyan-500/5 text-teal-300',
	violet: 'border-violet-400/25 from-violet-500/18 to-fuchsia-500/5 text-violet-300',
	blue: 'border-sky-400/25 from-blue-500/18 to-cyan-500/5 text-sky-300',
	amber: 'border-amber-400/25 from-amber-500/18 to-orange-500/5 text-amber-300',
	pink: 'border-pink-400/25 from-pink-500/18 to-fuchsia-500/5 text-pink-300',
};

const MethodCard = ({ title, statusLabel, isActive, href, icon, image, accent = 'teal', children }: MethodCardProps) => {
	const content = (
		<div className={`adnexa-glass-card group rounded-[28px] border bg-gradient-to-br p-4 transition-all duration-300 ${accentClass[accent]} ${isActive ? 'hover:-translate-y-1' : 'opacity-70'}`}>
			{/* ────────── Method Header ────────── */}
			<div className='flex items-center justify-between gap-3'>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-white/10 text-3xl'>
						{image ? <img src={image} alt={title} className='h-9 w-9 rounded-full object-contain' /> : icon}
					</div>
					<div className='min-w-0'>
						<h3 className='truncate text-lg font-black text-white'>{title}</h3>
						<span className={`mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-black ${isActive ? 'bg-emerald-400/12 text-emerald-300' : 'bg-slate-500/12 text-slate-400'}`}>
							{isActive ? <HiSparkles /> : <HiLockClosed />}
							{statusLabel}
						</span>
					</div>
				</div>
				<HiChevronRight className={`shrink-0 text-2xl ${isActive ? 'text-white/80 group-hover:translate-x-1' : 'text-slate-500'} transition-transform`} />
			</div>

			{/* ────────── Method Details ────────── */}
			<div className='mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center text-xs text-slate-400'>
				{children}
			</div>
		</div>
	);

	if (!isActive) return <div>{content}</div>;
	return <Link href={href}>{content}</Link>;
};

export default MethodCard;
