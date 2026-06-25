import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const CountrySelect = ({ countries, country, setCountry }: any) => {
	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setCountry(JSON.parse(value));
	};

	return (
		<div className='flex flex-col gap-1'>
			<label className={`text-sm font-semibold text-gray-400 `}>Country</label>
			<div>
				<select
					value={JSON.stringify(country)}
					className='w-full px-4 py-2 bg-transparent border rounded'
					onChange={handleChange}
				>
					{countries.map((countryItem: any) => (
						<option
							key={countryItem.code}
							value={JSON.stringify(countryItem)}
							className='text-gray-400 bg-gray-900'
						>
							{countryItem.name}
						</option>
					))}
				</select>
				{/* <span className='absolute -right-2 flex items-center px-4 text-xl text-cyan-600 top-3'>
					<IoIosArrowDown />
				</span> */}
			</div>
		</div>
	);
};

export default CountrySelect;
