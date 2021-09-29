// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { Form, Input, InputNumber, Button } from 'antd';

// const DetailTable = props => {
//     const dataSource = useState([
//         { id: 1, bookId: 1, borrowBookCode: "BBD001", quantity: 1, description: "none" },
//         { id: 2, bookId: 1, borrowBookCode: "BBD001", quantity: 1, description: "none" },
//     ]);
//     return (
//         <table id="borrow-book-detail">
//             <thead>
//                 <tr>
//                     <th>Stt</th>
//                     <th>Sách</th>
//                     <th>Mã mượn sách</th>
//                     <th>Số lượng</th>
//                     <th>Ghi chú</th>
//                     <th>Thao tác</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {dataSource.length > 0 && dataSource.map((row, index) => (
//                     <tr key={row.id}>
//                         <Form>
//                             <td>{index + 1}</td>
//                             <td>
//                                 <Form.Item
//                                     name="bookId"
//                                 >
//                                     <Input />
//                                 </Form.Item>
//                             </td>
//                             <td>
//                                 <Form.Item
//                                     name="bookId"
//                                 >
//                                     <Input />
//                                 </Form.Item>
//                             </td>
//                             <td>
//                                 <Form.Item
//                                     name="bookId"
//                                 >
//                                     <InputNumber min={1} max={2} />
//                                 </Form.Item>
//                             </td>
//                             <td>
//                                 <Form.Item
//                                     name="bookId"
//                                 >
//                                     <Input />
//                                 </Form.Item>
//                             </td>
//                             <td>
//                                 <Button
//                                     danger
//                                     type="link"
//                                     icon={<DeleteOutlined />}
//                                 >
//                                     Xóa
//                                 </Button>
//                             </td>
//                         </Form>
//                   </tr>
//                 ))}
//             </tbody>
//         </table>
//     )
// }

// export default DetailTable;

import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
const originData = [
    { id: 1, bookId: 1, borrowBookCode: "BBD001", quantity: 1, description: "none" },
    { id: 2, bookId: 1, borrowBookCode: "BBD002", quantity: 1, description: "none" },
];

// for (let i = 0; i < 100; i++) {
// 	originData.push({
// 		key: i.toString(),
// 		name: `Edrward ${i}`,
// 		age: 32,
// 		address: `London Park no. ${i}`
// 	});
// }

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`
						}
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const DetailTable = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState(originData);
	const [editingKey, setEditingKey] = useState("");

	const isEditing = record => record.key === editingKey;

	const edit = record => {
		form.setFieldsValue({
			name: "",
			age: "",
			address: "",
			...record
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const save = async key => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex(item => key === item.key);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });
				setData(newData);
				setEditingKey("");
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
        {
			title: "Stt",
			dataIndex: "stt",
			width: 50,
			editable: true,
            render: (text, record, index) => <div>{index + 1}</div>
		},
		{
			title: "Sách",
			dataIndex: "name",
			width: 200,
			editable: true
		},
		{
			title: "Mã mượn sách ct",
			dataIndex: "age",
			width: 200,
			editable: true
		},
        {
			title: "Số lượng",
			dataIndex: "address",
			width: 200,
			editable: true
		},
		{
			title: "Ghi chú",
			dataIndex: "description",
			width: 200,
			editable: true
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<a
							href="javascript:;"
							onClick={() => save(record.key)}
							style={{
								marginRight: 8
							}}
						>
							Save
						</a>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ""}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
				);
			}
		}
	];
	const mergedColumns = columns.map(col => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: record => ({
				record,
				inputType: col.dataIndex === "quantity" ? "number" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record)
			})
		};
	});
	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell
					}
				}}
				bordered
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel
				}}
			/>
		</Form>
	);
};

export default DetailTable;
