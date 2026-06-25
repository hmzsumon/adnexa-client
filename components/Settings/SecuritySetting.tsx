const SecuritySetting = () => {
	return (
		<div className='px-10 space-y-10'>
			<div>
				<p className=' text-primary font-semibold'>Authorization</p>
				<p className='text-sm text-slate-600'>
					Information for logging in to Exness.
				</p>
				<p className='text-sm text-slate-600'>
					Change your password whenever you think it might have been
					compromised.
				</p>
			</div>
			<div className='my-5 border'>
				<div className='px-5 py-7 grid grid-cols-3 items-center'>
					<p className='text-slate-600 text-sm'>Login</p>
					<p className='text-primary font-medium'>us********er@gmail.com</p>
				</div>
				<div className='px-5 py-7 grid grid-cols-3 border-t items-center'>
					<p className='text-slate-600 text-sm'>Password</p>
					<p className='text-primary font-medium text-sm'>************</p>
					<button className='px-5 py-2 border w-[fit-content] ml-auto duration-300 hover:bg-[#F1F2F2] rounded text-slate-500'>
						Change
					</button>
				</div>
			</div>
			<div>
				<p className=' text-primary font-semibold'>2-Step verification</p>
				<p className='text-sm text-slate-600'>
					2-step verification ensures that all sensitive transactions are
					authorized by you.
				</p>
				<p className='text-sm text-slate-600'>
					We encourage you to enter verification codes to confirm these
					transactions.
				</p>
			</div>
			<div className='px-5 mt-5 py-7 grid grid-cols-3 border items-center'>
				<p className='text-slate-600 text-sm'>Security type</p>
				<p className='text-primary font-medium text-sm'>us******er@gmail.com</p>
				<div className='flex items-center justify-end gap-5'>
					<p className='bg-[#FFEBED] rounded-badge px-4 py-1 text-primary text-[15px]'>
						Low security
					</p>
					<button className='px-5 py-2 border w-[fit-content] duration-300 hover:bg-[#F1F2F2] rounded text-slate-500'>
						Change
					</button>
				</div>
			</div>

			{/* Modal Content Here */}
			<dialog
				id='changePinModal'
				className='modal modal-bottom sm:modal-middle'
			>
				<div className='modal-box bg-white'>
					<p className='text-primary font-semibold'>Old Password</p>
					<input
						className='w-full p-3 bg-transparent text-black border border-slate-500 rounded outline-none h-10'
						type='password'
						name=''
						id=''
					/>
					<p className='text-primary mt-3 font-semibold'>New Password</p>
					<input
						className='w-full p-3 bg-transparent text-black border border-slate-500 rounded outline-none h-10'
						type='password'
						name=''
						id=''
					/>
					<p className='text-primary mt-3 font-semibold'>Confrim Password</p>
					<input
						className='w-full p-3 bg-transparent text-black border border-slate-500 rounded outline-none h-10'
						type='password'
						name=''
						id=''
					/>
					<p className='text-primary mt-3 font-semibold'>Message</p>
					<input
						className='w-full p-3 bg-transparent text-black border border-slate-500 rounded outline-none h-10'
						type='text'
						name=''
						id=''
					/>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<button className='px-6 py-3 primary-bg hover:bg-[#FFDA39] rounded font-semibold text-primary duration-300'>
								Next
							</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog
				id='changePinModalNext'
				className='modal modal-bottom sm:modal-middle'
			>
				<div className='modal-box bg-white'>
					<p className='text-primary mt-3 font-semibold'>One time OTP</p>
					<input
						className='w-full p-3 bg-transparent text-black border border-slate-500 rounded outline-none h-10'
						type='number'
						name=''
						id=''
					/>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<button className='px-6 py-3 primary-bg hover:bg-[#FFDA39] rounded font-semibold text-primary duration-300'>
								Save Pin
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default SecuritySetting;
