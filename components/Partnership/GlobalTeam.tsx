'use client';
import React from 'react';
import { Accordion } from 'flowbite-react';
import { FaHandHoldingUsd, FaUsers } from 'react-icons/fa';
import { SiLevelsdotfyi } from 'react-icons/si';
import PartnerTable from './PartnerTable';
import { RiGlobalFill } from 'react-icons/ri';
import { useFindDescendantsQuery } from '@/redux/features/auth/authApi';
import { formatBalance } from '@/lib/functions';
const GlobalTeam = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useFindDescendantsQuery(undefined);
	const { total_count, length } = data || {};
	const { sixLevels } = data || [];
	// console.log('sixLevels', sixLevels);
	return (
		<>
			{isLoading ? (
				<div>
					<h2 className='text-xl font-bold text-gray-700 my-4'>Loading...</h2>
				</div>
			) : (
				<div>
					<h2 className='text-xl font-bold text-gray-700 my-4'>
						Your Global Team Members
					</h2>
					<Accordion>
						{/* Start Global Gen 01 */}
						<Accordion.Panel>
							<Accordion.Title>
								<div className='flex gap-8 items-center  '>
									<p className=' flex items-center gap-1'>
										<RiGlobalFill />
										Global GEN-01
									</p>

									<p className=' flex items-center gap-1'>
										<FaUsers />
										2/{sixLevels?.length > 0 ? sixLevels[0]?.count : 0}
									</p>
									<p className=' flex items-center gap-1'>
										<FaHandHoldingUsd />
										{formatBalance(
											sixLevels?.length > 0
												? sixLevels[0]?.total_investment * 0.01
												: 0
										)}
										$
									</p>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<div className=' h-auto'>
									<PartnerTable
										data={sixLevels?.length > 0 ? sixLevels[0]?.users : []}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Panel>
						{/* End Global Gen 01 */}
						{/* Start Global Gen 02 */}
						<Accordion.Panel>
							<Accordion.Title>
								<div className='flex gap-8 items-center  '>
									<p className=' flex items-center gap-1'>
										<RiGlobalFill />
										Global GEN-02
									</p>

									<p className=' flex items-center gap-1'>
										<FaUsers />
										4/{sixLevels?.length > 1 ? sixLevels[1]?.count : 0}
									</p>
									<p className=' flex items-center gap-1'>
										<FaHandHoldingUsd />
										{formatBalance(
											sixLevels?.length > 1
												? sixLevels[1]?.total_investment * 0.009
												: 0
										)}
										$
									</p>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<div className=' h-auto'>
									<PartnerTable
										data={sixLevels?.length > 1 ? sixLevels[1]?.users : []}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Panel>
						{/* End Global Gen 02 */}
						{/* Start Global Gen 03 */}
						<Accordion.Panel>
							<Accordion.Title>
								<div className='flex gap-8 items-center  '>
									<p className=' flex items-center gap-1'>
										<RiGlobalFill />
										Global GEN-03
									</p>

									<p className=' flex items-center gap-1'>
										<FaUsers />
										8/{sixLevels?.length > 2 ? sixLevels[2]?.count : 0}
									</p>
									<p className=' flex items-center gap-1'>
										<FaHandHoldingUsd />
										{formatBalance(
											sixLevels?.length > 2
												? sixLevels[2]?.total_investment * 0.008
												: 0
										)}
										$
									</p>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<div className=' h-auto'>
									<PartnerTable
										data={sixLevels?.length > 2 ? sixLevels[2]?.users : []}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Panel>
						{/* End Global Gen 03 */}

						{/* Start Global Gen 04 */}
						<Accordion.Panel>
							<Accordion.Title>
								<div className='flex gap-8 items-center  '>
									<p className=' flex items-center gap-1'>
										<RiGlobalFill />
										Global GEN-04
									</p>

									<p className=' flex items-center gap-1'>
										<FaUsers />
										16/{sixLevels?.length > 3 ? sixLevels[3]?.count : 0}
									</p>
									<p className=' flex items-center gap-1'>
										<FaHandHoldingUsd />
										{formatBalance(
											sixLevels?.length > 3
												? sixLevels[3]?.total_investment * 0.007
												: 0
										)}
										$
									</p>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<div className=' h-auto'>
									<PartnerTable
										data={sixLevels?.length > 3 ? sixLevels[3]?.users : []}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Panel>

						{/* End Global Gen 04 */}

						{/* Start Global Gen 05 */}
						<Accordion.Panel>
							<Accordion.Title>
								<div className='flex gap-8 items-center  '>
									<p className=' flex items-center gap-1'>
										<RiGlobalFill />
										Global GEN-05
									</p>

									<p className=' flex items-center gap-1'>
										<FaUsers />
										32/{sixLevels?.length > 4 ? sixLevels[4]?.count : 0}
									</p>
									<p className=' flex items-center gap-1'>
										<FaHandHoldingUsd />
										{formatBalance(
											sixLevels?.length > 4
												? sixLevels[4]?.total_investment * 0.006
												: 0
										)}
										$
									</p>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<div className=' h-auto'>
									<PartnerTable
										data={sixLevels?.length > 4 ? sixLevels[4]?.users : []}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Panel>

						{/* End Global Gen 05 */}

						{/* Start Global Gen 06 */}
						<Accordion.Panel>
							<Accordion.Title>
								<div className='flex gap-8 items-center  '>
									<p className=' flex items-center gap-1'>
										<RiGlobalFill />
										Global GEN-06
									</p>

									<p className=' flex items-center gap-1'>
										<FaUsers />
										64/{sixLevels?.length > 5 ? sixLevels[5]?.count : 0}
									</p>
									<p className=' flex items-center gap-1'>
										<FaHandHoldingUsd />
										{formatBalance(
											sixLevels?.length > 5
												? sixLevels[5]?.total_investment * 0.005
												: 0
										)}
										$
									</p>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<div className=' h-auto'>
									<PartnerTable
										data={sixLevels?.length > 5 ? sixLevels[5]?.users : []}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Panel>
						{/* End Global Gen 06 */}
					</Accordion>
				</div>
			)}
		</>
	);
};

export default GlobalTeam;
