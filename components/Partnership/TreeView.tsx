import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import { useGetTreeNodeQuery } from '@/redux/features/auth/authApi';

const TreeNode = ({ node, handleSetNodeUserId }: any) => {
	const { left_node, right_node, main_node } = node || {};

	return (
		<div className=''>
			<div className='main-node node text-center '>
				<Image
					src='/user.png'
					alt='avatar'
					width={100}
					height={100}
					className='rounded-sm mx-auto'
				/>
				{main_node ? (
					<div>
						<p className='text-primary'>{main_node?.name}</p>
						<p>
							<span className='text-primary'>{main_node?.partner_id}</span>
						</p>
					</div>
				) : (
					<div className='text-center bg-icm-green rounded-md py-1 w-fit mx-auto px-8'>
						<p className='text-primary text-xs font-bold'>Empty</p>
					</div>
				)}
			</div>
			<div className='children flex gap-x-14 mt-10'>
				<div className=' node left-node'>
					<Image
						src='/user.png'
						alt='avatar'
						width={100}
						height={100}
						className={`rounded-sm ${
							left_node ? 'cursor-pointer' : 'cursor-not-allowed'
						}`}
						onClick={() => handleSetNodeUserId(left_node?.partner_id)}
					/>
					{left_node ? (
						<div className='text-center'>
							<p className='text-primary'>{left_node?.name}</p>
							<p>
								<span className='text-primary'>{left_node?.partner_id}</span>
							</p>
						</div>
					) : (
						<div className='text-center bg-icm-green rounded-md py-1'>
							<p className='text-primary text-xs font-bold'>Empty</p>
						</div>
					)}
				</div>
				<div className='node right-node'>
					<Image
						src='/user.png'
						alt='avatar'
						width={100}
						height={100}
						className={`rounded-sm ${
							right_node ? 'cursor-pointer' : 'cursor-not-allowed'
						}`}
						onClick={() => handleSetNodeUserId(right_node?.partner_id)}
					/>
					{right_node ? (
						<div className='text-center'>
							<p className='text-primary'>{right_node?.name}</p>
							<p>
								<span className='text-primary'>{right_node?.partner_id}</span>
							</p>
						</div>
					) : (
						<div className='text-center bg-icm-green rounded-md py-1'>
							<p className='text-primary text-xs font-bold'>Empty</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const TreeView = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [nodeUserId, setNodeUserId] = useState('');
	const [getNode, setGetNode] = useState(false);
	const { data, isLoading, isSuccess, isError, error, refetch } =
		useGetTreeNodeQuery(nodeUserId, { skip: !getNode });
	const { treeNode } = data || {};

	// handle set node user id
	const handleSetNodeUserId = (id: any) => {
		console.log('id', id);
		setGetNode(true);
		setNodeUserId(id);
	};

	// handle refetch
	const handleRefetch = () => {
		setGetNode(true);
		setNodeUserId(user.partner_id);
		refetch();
	};

	// initial set node user id user._id
	useEffect(() => {
		if (user) {
			setGetNode(true);
			setNodeUserId(user.partner_id);
		}
	}, [user]);

	return (
		<div className='bg-white p-5 border rounded mt-5'>
			<h1 className='my-10 text-gray-700 font-semibold text-center text-xl'>
				{' '}
				Your Global Tree View
			</h1>
			<div className=' flex items-center '>
				{isLoading ? (
					<div className='flex items-center justify-center h-[50vh] w-full'>
						<RingLoader color='#34E834' loading={true} size={100} />
					</div>
				) : (
					<div className='tree mx-auto'>
						<TreeNode
							node={treeNode}
							handleSetNodeUserId={handleSetNodeUserId}
						/>

						<div className=' flex items-center justify-center mt-3'>
							<button
								className='bg-icm-green text-white rounded-md px-5 py-1 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={handleRefetch}
								disabled={user?.partner_id === treeNode?.main_node?.partner_id}
							>
								Reload
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TreeView;
