import React, { useState, useRef, useContext, useEffect } from "react";
// import { InfinityTable as Table } from "antd-table-infinity";
import { Form, Input, Table, AutoComplete, InputNumber } from "antd";
// import 'antd-table-infinity/index.css';

// CONFIG EDITABLE - START
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const mockVal = (str, repeat = 1) => ({
	value: str.repeat(repeat)
});

const EditableCell = ({
	title,
	editable,
	children,
	inputType,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);
	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex]
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			// Remove 0 in front of number when type input is number
			if (inputType == "number") {
				values[Object.keys(values)[0]] = +values[
					Object.keys(values)[0]
				];
			}
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}
	};

	const [value, setValue] = useState("");
	const [options, setOptions] = useState([]);

	const onSearch = searchText => {
		setOptions(
			!searchText
				? []
				: [
						mockVal(searchText),
						mockVal(searchText, 2),
						mockVal(searchText, 3)
				  ]
		);
	};

	const onSelect = data => {
		console.log("onSelect", data);
	};

	const onChange = data => {
		setValue(data);
	};

	const getInput = () => {
		console.log("inputType", inputType);
		if (inputType === "number") {
			return (
				<InputNumber
					style={{ width: "100%" }}
					ref={inputRef}
					onPressEnter={save}
					onBlur={save}
				/>
			);
		}
		return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
	};

	let childNode = children;
	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0
				}}
				name={dataIndex}
				// rules={[
				// 	{
				// 		required: true,
				// 		message: `Chưa nhập dữ liệu hoặc định dạng dữ liệu bị sai.`
				// 	}
				// ]}
			>
				{inputType == "autocomplete" ? (
					<AutoComplete
						options={options}
						style={{
							width: 200
						}}
						onSelect={onSelect}
						onSearch={onSearch}
						placeholder="Chọn nhà phân phối"
						ref={inputRef}
						onBlur={save}
					/>
				) : (
					// <Input ref={inputRef} onPressEnter={save} onBlur={save} />
					getInput()
				)}
			</Form.Item>
		) : (
			<div className="editable-cell-value-wrap" onClick={toggleEdit}>
				{children}
			</div>
		);
	}
	return <td {...restProps}>{childNode}</td>;
};
// CONFIG EDITABLE - END
const TableContent = ({
	bordered,
	columns,
	dataSource,
	expandable,
	footer,
	getPopupContainer,
	loading,
	locale,
	pagination,
	rowClassName,
	rowKey,
	rowSelection,
	scroll,
	showHeader,
	showSorterTooltip,
	size,
	sortDirections,
	sticky,
	summary,
	tableLayout,
	title,
	onChange,
	onHeaderRow,
	onRow,
	handleSave,
	style,
	expandedRowRender,
	expandedRowKeys,
	onExpand,
	className,
	rowExpandable,
	indentSize
}) => {
	// PROCESS SAVE EDITABLE - START
	const mapColumns = col => {
		if (!col.editable) {
			return col;
		}
		const newCol = {
			...col,
			onCell: record => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				inputType: col.inputType,
				title: col.title,
				handleSave: handleSave
			})
		};
		if (col.children) {
			newCol.children = col.children.map(mapColumns);
		}
		return newCol;
	};
	const columnsData = columns.map(mapColumns);
	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell
		}
	};
	// PROCESS SAVE EDITABLE - END

	return (
		<Table
			bordered={bordered}
			columns={columnsData}
			components={components}
			dataSource={dataSource}
			expandable={expandable}
			footer={footer}
			getPopupContainer={getPopupContainer}
			loading={loading}
			locale={locale}
			pagination={pagination}
			rowClassName={rowClassName}
			rowKey={rowKey}
			rowSelection={rowSelection}
			scroll={scroll}
			showHeader={showHeader}
			showSorterTooltip={showSorterTooltip}
			size={size}
			sortDirections={sortDirections}
			sticky={sticky}
			summary={summary}
			tableLayout={tableLayout}
			title={title}
			onChange={onChange}
			onHeaderRow={onHeaderRow}
			onRow={onRow}
			style={style}
			expandedRowRender={expandedRowRender}
			expandedRowKeys={expandedRowKeys}
			onExpand={onExpand}
			className={className}
			rowExpandable={rowExpandable}
			indentSize={indentSize}
		/>
	);
};

export default TableContent;
