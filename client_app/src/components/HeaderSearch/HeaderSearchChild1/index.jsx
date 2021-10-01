import React, { useState } from "react";
import { DatePicker, Row, Col, TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
	{
		title: "Node1",
		value: "0-0",
		key: "0-0",
		children: [
			{
				title: "Child Node1",
				value: "0-0-0",
				key: "0-0-0"
			}
		]
	},
	{
		title: "Node2",
		value: "0-1",
		key: "0-1",
		children: [
			{
				title: "Child Node3",
				value: "0-1-0",
				key: "0-1-0",
				children: [
					{
						title: "Child Node n3",
						value: "0-1-11",
						key: "0-1-11"
					},
					{
						title: "Child Node m3",
						value: "0-1-12",
						key: "0-1-12"
					}
				]
			},
			{
				title: "Child Node4",
				value: "0-1-1",
				key: "0-1-1"
			},
			{
				title: "Child Node5",
				value: "0-1-2",
				key: "0-1-2"
			}
		]
	}
];
const HeaderChild1 = () => {
	const [valueTreeSelect, setValueTreeSelect] = useState(["0-0-0"]);

	const onChangeSearch = value => {
		console.log("onChangeSearch ", value);
		setValueTreeSelect(value);
	};
	const tProps = {
		treeData,
		value: valueTreeSelect,
		onChange: onChangeSearch,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: "Tìm kiếm NPP, Miền, Vùng...",
		style: {
			width: "100%"
		}
	};
	const onChangeDate = (date, dateString) => {
		console.log(date, dateString);
	};
	return (
		<>
			<Row gutter={16}>
				<Col span={14}>
					<TreeSelect {...tProps} />
				</Col>
				<Col span={10}>
					<DatePicker
						style={{ width: "100%" }}
						onChange={onChangeDate}
						picker="month"
						placeholder={"Chọn tháng phân bổ"}
					/>
				</Col>
			</Row>
		</>
	);
};

export default HeaderChild1;
