import { withUt } from 'uploadthing/tw';
import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'node_modules/flowbite-react/lib/esm/**/*.js',
		flowbite.content(),
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'icm-green': '#34E834',
				'icm-black-2': '#1D232A',
				'cbc-green': '#4E8850',
				'cbc-green-2': '#A1CA57',
				'cbc-orange': '#aa72ce',
				'cbc-blue': '#227f9e',
				'cbc-black': '#070b28',
			},
		},
	},
	plugins: [flowbite.plugin()],
};
export default withUt(config);
