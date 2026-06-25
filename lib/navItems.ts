import React from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { RiShareForward2Fill } from 'react-icons/ri';
import { GiTimeTrap } from 'react-icons/gi';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { TiSocialInstagram } from 'react-icons/ti';
import { DiGoogleAnalytics } from 'react-icons/di';
import { IoSettingsSharp } from 'react-icons/io5';
import { ImUserPlus } from 'react-icons/im';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { FaFilterCircleDollar } from 'react-icons/fa6';

// Define types for the icon components
type IconComponent = React.ComponentType<any>;

const sideNavItems = [
	{
		id: 1,
		name: 'Dashboard',
		link: '/dashboard',
		icon: LuLayoutDashboard,
	},
	{
		id: 2,
		name: 'Deposit',
		link: '/deposit',
		icon: PiDownloadSimpleBold,
	},
	{
		id: 3,
		name: 'Withdraw',
		link: '/withdraw',
		icon: RiShareForward2Fill,
	},
	{
		id: 4,
		name: 'Transactions',
		link: '/transactions',
		icon: GiTimeTrap,
	},
	{
		id: 5,
		name: 'Partnership',
		link: '/partnership',
		icon: FaHandshakeSimple,
	},
	{
		id: 6,
		name: 'Investment',
		link: '/investment',
		icon: FaFilterCircleDollar,
	},
	{
		id: 7,
		name: 'Settings',
		link: '/settings',
		icon: IoSettingsSharp,
	},
	{
		id: 8,
		name: 'Support',
		link: '/support',
		icon: TiSocialInstagram,
	},
	{
		id: 9,
		name: 'About',
		link: '/about',
		icon: DiGoogleAnalytics,
	},
];

export default sideNavItems as {
	id: number;
	name: string;
	link: string;
	icon: IconComponent;
}[];
