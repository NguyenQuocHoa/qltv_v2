import React, { useState, useEffect } from "react";
import {
	FormOutlined,
	DeleteOutlined,
	CheckOutlined,
	PlusCircleOutlined,
	CloseOutlined
} from "@ant-design/icons";
import {
	Table,
	Input,
	InputNumber,
	Popconfirm,
	Form,
	Typography,
	Button,
	Tooltip,
	Row,
	Col
} from "antd";
import { connect } from "umi";
import SelectBook from "../../../shared/select/selectBook";
import styles from "../../../shared/style/tableStyle.less";

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
	let inputNode;
	if (inputType === "number")
		inputNode = <InputNumber min={1} max={2} className={styles.fw} />;
	if (inputType === "text") inputNode = <Input />;
	if (inputType === "select") inputNode = <SelectBook />;

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
							required: dataIndex != "description" ? true : false,
							message: `Vui lòng nhập ${title}!`
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

const DetailTable = props => {
	const { hashmap, getDataSource, dataSource = [], code } = props;
	const [form] = Form.useForm();
	const [data, setData] = useState(dataSource);
	const [editingKey, setEditingKey] = useState("");

	const isEditing = record => record.key === editingKey;

	const edit = record => {
		const bookId = record.bookIdHide;
		form.setFieldsValue({
			...record,
			bookId
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
				const bookIdHide = row.bookId;
				const bookId = hashmap[row.bookId].bookName;
				newData.splice(index, 1, {
					...item,
					...row,
					bookId,
					bookIdHide
				});
				// newData.splice(index, 1, { ...row, ...item });
				setData(newData);
				setEditingKey("");
				getDataSource(newData);
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const getDetailId = () => {
		return (
			"_" + (data.length + 1) + "_" +
			new Date().getMilliseconds()
		);
	};

	const handleDeleteRow = async id => {
		try {
			setData(data.filter(row => row.id !== id));
			setEditingKey("");
		} catch (errInfo) {
			console.log("Delete Failed:", errInfo);
		}
	};

	const handleAddRow = async => {
		try {
			setData([
				...data,
				{
					id: data.length + new Date().getMilliseconds(),
					key: data.length + new Date().getMilliseconds(),
					bookId: null,
					borrowBookDetailCode: code + getDetailId(),
					quantity: 1,
					description: ""
				}
			]);
		} catch (errInfo) {
			console.log("Add Failed:", errInfo);
		}
	};

	useEffect(() => {
		setData(
			dataSource.length > 0 ? dataSource.map(row => {
				if (typeof row.bookId === "number") {
					const id = row.bookId;
					row.bookIdHide = id;
					row.bookId = hashmap[id]?.bookName;
				}
				return row;
			}) : []
		);
	}, [dataSource]);

	const columns = [
		{
			title: "Stt",
			dataIndex: "stt",
			width: 100,
			align: "center",
			render: (text, record, index) => <div>{index + 1}</div>
		},
		{
			title: "Sách",
			dataIndex: "bookId",
			editable: true,
			width: 250
		},
		{
			title: "Mã mượn sách ct",
			dataIndex: "borrowBookDetailCode",
			editable: true
		},
		{
			title: "Số lượng",
			dataIndex: "quantity",
			editable: true,
			align: "right"
		},
		{
			title: "Ghi chú",
			dataIndex: "description",
			editable: true
		},
		{
			title: "Thao tác",
			dataIndex: "operation",
			align: "center",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Tooltip title="Lưu">
							<Button
								onClick={() => save(record.key)}
								type="link"
								icon={<CheckOutlined />}
								style={{ color: "#57A773" }}
							/>
						</Tooltip>
						<Popconfirm
							title="Xác nhận xóa hủy thay đổi?"
							onConfirm={cancel}
						>
							<Tooltip title="Hủy">
								<Button
									danger
									type="link"
									icon={<CloseOutlined />}
									style={{ color: "#FA7921" }}
								/>
							</Tooltip>
						</Popconfirm>
					</span>
				) : (
					<span>
						<Tooltip title="Chỉnh sửa">
							<Button
								onClick={() => edit(record)}
								disabled={editingKey !== ""}
								type="link"
								icon={<FormOutlined />}
							/>
						</Tooltip>
						<Popconfirm
							title="Xác nhận xóa dòng này?"
							onConfirm={() => {
								handleDeleteRow(record.id);
							}}
						>
							<Tooltip title="Xóa dòng">
								<Button
									danger
									disabled={editingKey !== ""}
									type="link"
									icon={<DeleteOutlined />}
								/>
							</Tooltip>
						</Popconfirm>
					</span>
				);
			}
		}
	];

	const mapCol = {
		bookId: "select",
		borrowBookDetailCode: "text",
		quantity: "number",
		description: "text"
	};

	const mergedColumns = columns.map(col => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: record => ({
				record,
				// inputType: col.dataIndex === "quantity" ? "number" : "text",
				inputType: mapCol[col.dataIndex],
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record)
			})
		};
	});
	return (
		<Form form={form} component={false}>
			<Row gutter={16} justify="end">
				<Col>
					<Tooltip title="Thêm dòng">
						<Button
							type="primary"
							icon={<PlusCircleOutlined />}
							className={styles.btnAddRow}
							onClick={handleAddRow}
						>
							Thêm dòng
						</Button>
					</Tooltip>
				</Col>
			</Row>

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
				rowKey="id"
			/>
		</Form>
	);
};

export default connect(({ bookAll }) => ({
	hashmap: bookAll.hashmap
}))(DetailTable);
