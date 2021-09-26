import React from "react";
import {
	DeleteOutlined,
	FormOutlined,
	RetweetOutlined
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
import styles from "../../../shared/style/tableStyle.less";

const AccountTable = props => {
	const { onParamsChange, userRoles, dispatch, accounts, loading } = props;

	const handleDeleteCustomer = id => {
		dispatch({
			type: "accountDelete/deleteAccountRequest",
			id
		});
	};

	const handleResetPassword = id => {
		dispatch({
			type: "accountUpdate/resetPasswordRequest",
			id
		});
	};
	// const allowUpdate = userRoles?.KHACHHANG?.sua ?? false;
	// const allowRemove = userRoles?.KHACHHANG?.xoa ?? false;

	const columns = [
		{
			title: "Tên tài khoản",
			dataIndex: "username",
			key: "username",
			filterMultiple: false,
			align: "center",
			...columnSearchProps("Tên tài khoản")
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
			title: "Ghi chú",
			dataIndex: "description",
			key: "description",
			filterMultiple: false,
			align: "center",
			...columnSearchProps("Ghi chú")
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
							<Link to={`/accounts/${record.id}`}>
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
								title="Xác nhận xóa tài khoản này?"
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

						{true ? (
							<Popconfirm
								title="Xác nhận đặt lại mật khẩu tài khoản này?"
								onConfirm={() => {
									handleResetPassword(record.id);
								}}
							>
								<Tooltip title="Đặt lại mật khẩu">
									<Button
										loading={loading}
										type="link"
										icon={<RetweetOutlined />}
										style={{ color: "#ff671d" }}
									/>
								</Tooltip>
							</Popconfirm>
						) : (
							<Tooltip title="Đặt lại mật khẩu">
								<Button
									loading={loading}
									type="link"
									icon={<RetweetOutlined />}
									style={{ color: "#ff671d" }}
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
			dataSource={accounts}
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
		loading: state.loading.effects["accountList/getAccountPagingRequest"]
	};
};

export default connect(mapStateTopProps)(AccountTable);
