export interface Package {
	return_percent: string;
	daily_return: number;
	tasks_value: number;
	daily_tasks: number;
	_id: number;
	title: string;
	price: number;
	profit_day: string;
	weekly: string;
	return: string;
	total_return: number;
}

// myPackage interface
export interface MyPackage {
	price: number;
	title: string;
	take_return: number;
	daily_return: number;
	daily_tasks: number;
	tasks_value: number;
	duration: number;
	_id: string;
	p_title: string;
	sub_title: string;
	p_price: number;
	p_return: number;
	p_duration: string;
	is_active: boolean;
	is_expired: boolean;
	profit: number;

	to_day_profit: number;
	active_date: Date;
	expire_date: any;
	profit_day: string;
	weekly: string;
	return: string;
	total_return: number;
	createdAt: string;
	updatedAt: string;
}
