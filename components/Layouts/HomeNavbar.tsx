'use client';
import Link from 'next/link';
import { Button, Navbar } from 'flowbite-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const HomeNavbar = () => {
	const pathname = usePathname();
	return (
		<Navbar fluid className='bg-[#070b28] p-4 sticky top-0 z-50'>
			<Navbar.Brand>
				<Image
					src='/logo_2.png'
					alt='Logo'
					width={400}
					height={100}
					className='object-contain w-10 h-auto'
				/>
			</Navbar.Brand>
			<div className='flex md:order-2'>
				{pathname === '/' ? (
					<Link href='/register'>
						<Button className='bg-cbc-blue'>Register</Button>
					</Link>
				) : (
					<Link href='/'>
						<Button className='bg-cbc-orange'>Login</Button>
					</Link>
				)}
				{/* <Navbar.Toggle /> */}
			</div>
			{/* <Navbar.Collapse>
				<Navbar.Link href='#' active>
					Home
				</Navbar.Link>
				<Navbar.Link href='#'>About</Navbar.Link>
				<Navbar.Link href='#'>Services</Navbar.Link>
				<Navbar.Link href='#'>Pricing</Navbar.Link>
				<Navbar.Link href='#'>Contact</Navbar.Link>
			</Navbar.Collapse> */}
		</Navbar>
	);
};

export default HomeNavbar;
