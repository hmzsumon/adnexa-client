import { link } from 'fs';
import Link from 'next/link';

const cardData = [
	{
		id: 1,
		title: 'Partner Program',
		subTitle: 'Explore the Benefits of Our Referral Program!',
		description:
			'Inspire users to refer others with the promise of turning dreams into reality! Through our Referral Program, you can earn bonuses based on package purchases from users you refer.',
		link: '/partner-program',
	},
	{
		id: 2,
		title: 'Generation Program',
		subTitle: 'Energize Your Network Members with Generation Bonus Rewards!',
		description:
			'A distributor will receive a commission based on a percentage of sales from generation. Commission rate is different for each generation. Click view for details.',
		link: '/generation-program',
	},
	{
		id: 3,
		title: 'Global Program',
		subTitle: 'Automatically Grow Your Package Earnings.',
		description:
			'Joining our network opens up a world of opportunities! Every user you refer who joins and purchases a package entitles you to a percentage of their package sale. This enticing incentive, known as the Global Bonus, rewards you for expanding your network and fostering growth',
		link: '/global-program',
	},
];

const PartnerCards = () => {
	return (
		<div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
			{cardData.map((card) => (
				<div
					className=' p-5 rounded partner-card duration-300 text-center'
					key={card.id}
				>
					<h2 className='w-[40px] h-[40px] mx-auto flex items-center justify-center border-slate-400 rounded-full border text-3xl text-secondary'>
						{card.id}
					</h2>
					<h2 className='text-xl font-bold text-primary  my-7'>{card.title}</h2>
					<h4 className=' text-primary text-'>{card.subTitle}</h4>
					<p className='my-7  text-secondary'>{card.description}</p>
					<Link href={card.link}>
						<button className='px-6 py-3  bg-icm-green hover:bg-icm-green rounded font-semibold text-primary duration-300'>
							View more
						</button>
					</Link>
				</div>
			))}
		</div>
	);
};

export default PartnerCards;
