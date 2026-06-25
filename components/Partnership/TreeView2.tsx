import React from 'react';

const getTreeData = () => {
	return {
		element: 'Main',
		left: {
			element: 'test12',
			left: {
				element: 'test122',
			},
			right: {
				element: 'test123',
			},
		},
		right: {
			element: 'test13',
			left: {
				element: 'test132',
				left: {
					element: 'test1321',
					left: {
						element: 'test13211',
					},
				},
			},
			right: {
				element: 'test133',
				left: {
					element: 'test1332',
				},
				right: {
					element: 'test1333',
					left: {
						element: 'test1321',
						left: {
							element: 'test13211',
						},
					},
					right: {
						element: 'test1321',
						right: {
							element: 'test13211',
						},
					},
				},
			},
		},
	};
};

const renderBinaryTree = (node: any) => {
	const { left, right, element } = node;
	return (
		<div className='node node--root'>
			<div className='node__element'>{element}</div>
			{left || right ? (
				<div className='node node--root'>
					<div className='node__bottom-line'></div>
					<div className='node__children'>
						{left ? <div className='node'>{renderBinaryTree(left)}</div> : null}
						{right ? (
							<div className='node'>{renderBinaryTree(right)}</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
};

const TreeView = () => {
	const rootNode = getTreeData();
	console.log(rootNode);
	return (
		<div className='bg-white p-5 border rounded mt-5'>
			<h1 className='my-10'>TreeView</h1>
			<div className=' flex items-center'>
				<div className='tree mx-auto'>
					<div className='node node--root'>
						<div className='node_element'>Main</div>
						<div className='node_bottom-line'></div>
						<div className='node_children'>
							<div className='node'>
								<div className='node_element'>Left Child</div>
							</div>

							<div className='node'>
								<div className='node_element'>Right Child</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TreeView;
