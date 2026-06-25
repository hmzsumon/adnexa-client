'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const GoBack = () => {
	const router = useRouter();
	return (
		<button type='button' onClick={() => router.back()}>
			<MdOutlineKeyboardBackspace className=' text-2xl' />
		</button>
	);
};

export default GoBack;
