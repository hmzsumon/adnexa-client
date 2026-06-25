'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

type QuickLinkTileProps = {
	title: string;
	subtitle: string;
	href: string;
	icon: IconType;
	variant?: 'green' | 'orange' | 'purple' | 'blue';
};

const variantClass = {
	green: 'from-emerald-400/25 to-cyan-500/10 text-emerald-300',
	orange: 'from-amber-400/25 to-orange-500/10 text-amber-300',
	purple: 'from-violet-400/25 to-fuchsia-500/10 text-violet-300',
	blue: 'from-blue-400/25 to-cyan-500/10 text-sky-300',
};

const QuickLinkTile = ({ title, subtitle, href, icon: Icon, variant = 'blue' }: QuickLinkTileProps) => {
	return (
		<Link href={href} className='adnexa-glass-card flex items-center gap-3 rounded-[22px] p-3 transition-all duration-300 hover:-translate-y-1'>
			{/* ────────── Quick Link Icon ────────── */}
			<div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${variantClass[variant]}`}>
				<Icon className='text-2xl' />
			</div>

			{/* ────────── Quick Link Text ────────── */}
			<div className='min-w-0'>
				<h4 className='truncate text-sm font-bold text-white'>{title}</h4>
				<p className='truncate text-xs text-slate-400'>{subtitle}</p>
			</div>
		</Link>
	);
};

export default QuickLinkTile;
