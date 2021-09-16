import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
import { numberWithComas } from "../../../../utils/utils";
import styles from "./style.less";

const CustomerTable = props => {
	const { onParamsChange, userRoles, dispatch, books, loading } = props;
	const handleDeleteCustomer = id => {
		dispatch({
			type: "bookDelete/deleteBookRequest",
			id
		});
	};
	// const allowUpdate = userRoles?.KHACHHANG?.sua ?? false;
	// const allowRemove = userRoles?.KHACHHANG?.xoa ?? false;

	const columns = [
		{
			title: "Mã sách",
			dataIndex: "bookCode",
			key: "bookCode",
			filterMultiple: false,
			...columnSearchProps("bookCode")
		},
		{
			title: "Tên sách",
			dataIndex: "bookName",
			key: "bookName",
			filterMultiple: false,
			...columnSearchProps("bookName")
		},
		{
			title: "Tác giả",
			dataIndex: "author",
			key: "author",
			filterMultiple: false,
			...columnSearchProps("author")
		},
		{
			title: "Tồn kho",
			dataIndex: "inventory",
			key: "inventory",
			filterMultiple: false,
			align: "right",
			render: data => <div>{numberWithComas(data)}</div>
		},
		{
			title: "Trạng thái",
			dataIndex: "isActive",
			key: "isActive",
			filterMultiple: false,
			align: "center",
			render: data => (
				<div>
					{data ? (
						<Tag className={styles.title} color="blue">
							Kích hoạt
						</Tag>
					) : (
						<Tag className={styles.title} color="red">
							Chưa kích hoạt
						</Tag>
					)}
				</div>
			)
		},
		{
			title: "Nội dung chính",
			dataIndex: "mainContent",
			key: "mainContent",
			filterMultiple: false,
			width: 300,
			...columnSearchProps("mainContent")
		},
		{
			title: "Thao tác",
			key: "action",
			width: "5%",
			align: "center",
			render: (text, record, index) => (
				<div key={index}>
					<Space>
						{true ? (
							<Link to={`/customers/${record.id}`}>
								<Tooltip title="Xem chi tiết">
									<Button
										type="link"
										icon={<FormOutlined />}
									/>
								</Tooltip>
							</Link>
						) : (
							<Tooltip title="Xem chi tiết">
								<Button
									disabled
									type="link"
									icon={<FormOutlined />}
								/>
							</Tooltip>
						)}
						{true ? (
							<Popconfirm
								title="Xác nhận xóa quyển sách này?"
								onConfirm={() => {
									handleDeleteCustomer(record.id);
								}}
							>
								<Tooltip title="Xóa">
									<Button
										loading={loading}
										danger
										type="link"
										icon={<DeleteOutlined />}
									/>
								</Tooltip>
							</Popconfirm>
						) : (
							<Tooltip title="Xóa">
								<Button
									loading={loading}
									danger
									type="link"
									icon={<DeleteOutlined />}
									disabled
								/>
							</Tooltip>
						)}
					</Space>
				</div>
			)
		}
	];

	const handleParamsChange = (pagination, filters, sorter) => {
		// const {
		// 	maKhachHang,
		// 	ngayBaoCao,
		// 	tenTrangThai,
		// 	tenNguoiBaoCao
		// } = filters;
		// const filtersParams = {
		// 	search: maKhachHang?.[0] ?? ""
		// 	// userFilter: tenNguoiBaoCao?.[0] ?? "",
		// 	// reportTimeFilterFrom: ngayBaoCao?.[0] ?? null,
		// 	// reportTimeFilterTo: ngayBaoCao?.[1] ?? null,
		// 	// statusFilter: tenTrangThai?.[0] ?? ""
		// };
		// onParamsChange(filtersParams);
	};

	return (
		<Table
			columns={columns}
			dataSource={books}
			pagination={false}
			onChange={handleParamsChange}
			size="small"
			rowKey="id"
			loading={loading}
		/>
	);
};

const mapStateTopProps = state => {
	return {
		// userRoles: state.UserRole.userRoles,
		loading: state.loading.effects["bookList/getBookPagingRequest"]
	};
};

export default connect(mapStateTopProps)(CustomerTable);
