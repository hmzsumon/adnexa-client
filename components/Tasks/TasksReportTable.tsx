import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { formatDate } from '@/lib/functions';

const TasksReportTable = ({ data }: any) => {
	const columns: GridColDef<any>[] = [
		{
			field: 'date',
			headerName: 'Date',
			width: 100,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.date}</p>
				</div>
			),
		},

		{
			field: 'tasks_value',
			headerName: 'Tasks Value',
			width: 100,
			renderCell: (params: any) => (
				<div className=''>
					<p>{Number(params.row.tasks_value).toFixed(4)}$</p>
				</div>
			),
		},
		{
			field: 'total_earning',
			headerName: 'Total Earning',
			width: 100,
			renderCell: (params: any) => (
				<div className=''>
					<p>{Number(params.row.total_earning).toFixed(4)}$</p>
				</div>
			),
		},
	];

	const rows: any = [];
	data &&
		data.map((record: any) => {
			return rows.push({
				id: record._id,
				tasks_value: record.tasks_value,
				total_earning: record.total_earning,
				tasks_completed: record.tasks_completed,
				date: formatDate(record.createdAt),
			});
		});

	return (
		<div className='w-full mx-auto bg-white'>
			<DataGrid
				autoHeight
				rows={rows}
				columns={columns}
				// rowHeight={38}
				// initialState={{
				// 	pagination: {
				// 		paginationModel: { pageSize: 5, page: 0 },
				// 	},
				// }}
				sx={{ height: 400, width: '100%' }}
			/>
		</div>
	);
};

export default TasksReportTable;
