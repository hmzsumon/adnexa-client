'use client';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div>
			<Card>
				<div className='flex items-center gap-4 '>
					<div className='rounded-full border-2 border-primary p-2'>
						<Image src='/user.png' width={40} height={40} alt='avatar' />
					</div>
					<div className='space-y-1'>
						<p className='text-sm font-semibold   text-primary'>Profiles</p>
						<p className='text-sm   text-primary'>{user?.name}</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Profile;
