// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { EditableProTable } from "@ant-design/pro-table";
// import { ProFormRadio } from "@ant-design/pro-form";

// const waitTime = (time = 100) => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(true);
// 		}, time);
// 	});
// };

// const defaultData = [
// 	{
// 		id: 624748504,
// 		title: "title 1",
// 		decs: "decs 1",
// 		state: "open",
// 		created_at: "2020-05-26T09:42:56Z",
// 		update_at: "2020-05-26T09:42:56Z"
// 	},
// 	{
// 		id: 624691229,
// 		title: "title 2",
// 		decs: "decs 2",
// 		state: "closed",
// 		created_at: "2020-05-26T08:19:22Z",
// 		update_at: "2020-05-26T08:19:22Z"
// 	}
// ];

// const DetailTable = () => {
// 	const [editableKeys, setEditableRowKeys] = useState([]);
// 	const [dataSource, setDataSource] = useState([]);
// 	const [position, setPosition] = useState("top");
// 	const books = {
// 		1: { id: 1, text: "Book 1" },
// 		2: { id: 2, text: "Book 2" },
// 		3: { id: 3, text: "Book 3" }
// 	};

// 	useEffect(() => {
// 		console.log("datasource", dataSource);
// 	}, [dataSource]);

// 	const columns = [
// 		{
// 			title: "Tên",
// 			dataIndex: "title",
// 			formItemProps: (form, { rowIndex }) => {
// 				return {
// 					rules:
// 						rowIndex > 2
// 							? [{ required: true, message: "Require title" }]
// 							: []
// 				};
// 			},
// 			// 第二行不允许编辑
// 			editable: (text, record, index) => {
// 				return index !== 0;
// 			},
// 			width: "30%"
// 		},
// 		{
// 			title: "Trạng thái",
// 			key: "state",
// 			dataIndex: "state",
// 			valueType: "select",
// 			valueEnum: books
// 			// valueEnum: {
// 			// 	all: { text: "All", status: "Default" },
// 			// 	open: {
// 			// 		text: "Errrr",
// 			// 		status: "Error"
// 			// 	},
// 			// 	closed: {
// 			// 		text: "Success",
// 			// 		status: "Success"
// 			// 	}
// 			// }
// 		},
// 		{
// 			title: "Thao tác",
// 			valueType: "option",
// 			width: 200,
// 			render: (text, record, _, action) => [
// 				<a
// 					key="editable"
// 					onClick={() => {
// 						action?.startEditable?.(record.id);
// 					}}
// 				>
// 					Edit
// 				</a>,
// 				<a
// 					key="delete"
// 					onClick={() => {
// 						setDataSource(
// 							dataSource.filter(item => item.id !== record.id)
// 						);
// 					}}
// 				>
// 					Delete
// 				</a>
// 			]
// 		}
// 	];

// 	return (
// 		<>
// 			<EditableProTable
// 				rowKey="id"
// 				// headerTitle="可编辑表格"
// 				maxLength={5}
// 				recordCreatorProps={
// 					position !== "hidden"
// 						? {
// 								position: position,
// 								record: () => ({
// 									id: (Math.random() * 1000000).toFixed(0)
// 								})
// 						  }
// 						: false
// 				}
// 				toolBarRender={() => [
// 					<ProFormRadio.Group
// 						key="render"
// 						fieldProps={{
// 							value: position,
// 							onChange: e => setPosition(e.target.value)
// 						}}
// 						options={[
// 							{
// 								label: "Top",
// 								value: "top"
// 							},
// 							{
// 								label: "Bottom",
// 								value: "bottom"
// 							},
// 							{
// 								label: "Hidden",
// 								value: "hidden"
// 							}
// 						]}
// 					/>
// 				]}
// 				columns={columns}
// 				request={async () => ({
// 					data: [],
// 					total: 3,
// 					success: true
// 				})}
// 				value={dataSource}
// 				onChange={setDataSource}
// 				// editable={{
// 				// 	type: "multiple",
// 				// 	editableKeys,
// 				// 	onSave: async (rowKey, data, row) => {
// 				// 		console.log(rowKey, data, row);
// 				// 		await waitTime(2000);
// 				// 	},
// 				// 	onChange: setEditableRowKeys
// 				// }}
// 				editable={{
// 					type: "multiple",
// 					editableKeys,
// 					actionRender: (row, config, defaultDoms) => {
// 						return [defaultDoms.delete];
// 					},
// 					onValuesChange: (record, recordList) => {
// 						setDataSource(recordList);
// 					},
// 					onChange: setEditableRowKeys
// 				}}
// 			/>
// 		</>
// 	);
// };

// export default DetailTable;
