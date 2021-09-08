import {
	CheckSquareTwoTone,
	SmileTwoTone,
	UpSquareTwoTone
} from "@ant-design/icons";
import { Table, Tag } from "antd";
import update from "immutability-helper";
import React, { useCallback, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./style.less";

const type = "DraggableBodyRow";

const DraggableBodyRow = ({
	index,
	moveRow,
	setIsShowDetail,
	className,
	style,
	...restProps
}) => {
	const ref = useRef();
	const [{ isOver, dropClassName }, drop] = useDrop({
		accept: type,
		collect: monitor => {
			const { index: dragIndex } = monitor.getItem() || {};
			if (dragIndex === index) {
				return {};
			}
			return {
				isOver: monitor.isOver(),
				dropClassName:
					dragIndex < index
						? " drop-over-downward"
						: " drop-over-upward"
			};
		},
		drop: item => {
			moveRow(item.index, index);
		}
	});
	const [, drag] = useDrag({
		type,
		item: { index },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});
	drop(drag(ref));

	return (
		<tr
			ref={ref}
			className={`${className}${isOver ? dropClassName : ""}`}
			style={{ cursor: "move", ...style }}
			{...restProps}
			onClick={() => setIsShowDetail(true)}
		/>
	);
};

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text, record, index) => (
			<div>
				{record.type ? (
					<SmileTwoTone className={styles.tagFirtrow} />
				) : (
					<CheckSquareTwoTone
						className={styles.tagFirtrow}
						twoToneColor="#2081C3"
					/>
				)}
				{record.priority ? (
					<SmileTwoTone className={styles.tagFirtrow} />
				) : (
					<UpSquareTwoTone
						className={styles.tagFirtrow}
						twoToneColor="#cd201f"
					/>
				)}
				{` ${record.name}, ${record.page}, ${record.address} `}
				<Tag color="geekblue">Web Online Sale For</Tag>
				<Tag color="purple">Thêm SP</Tag>
			</div>
		)
	}
	// {
	// 	title: "Age",
	// 	dataIndex: "age",
	// 	key: "age"
	// },
	// {
	// 	title: "Address",
	// 	dataIndex: "address",
	// 	key: "address"
	// }
];

const TableTask = props => {
	const { setIsShowDetail } = props;
	const [data, setData] = useState([
		{
			key: "1",
			name: "John Brown",
			age: 32,
			address: "New York No. 1 Lake Park"
		},
		{
			key: "2",
			name: "Jim Green",
			age: 42,
			address: "London No. 1 Lake Park"
		},
		{
			key: "3",
			name: "Joe Black",
			age: 32,
			address: "Sidney No. 1 Lake Park"
		}
	]);

	const components = {
		body: {
			row: DraggableBodyRow
		}
	};

	const moveRow = useCallback(
		(dragIndex, hoverIndex) => {
			const dragRow = data[dragIndex];
			setData(
				update(data, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRow]
					]
				})
			);
		},
		[data]
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<Table
				columns={columns}
				dataSource={data}
				components={components}
				onRow={(record, index) => ({
					index,
					moveRow,
					setIsShowDetail
				})}
				size="small"
				pagination={false}
			/>
		</DndProvider>
	);
};

export default TableTask;
