import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
// import { toDate } from "../../../../utils/utils";
import styles from "./style.less";

const CustomerTable = props => {
	const { onParamsChange, userRoles, dispatch, customers, loading } = props;
	const handleDeleteCustomer = id => {
		dispatch({
			type: "customerDelete/deleteCustomerRequest",
			id
		});
	};
	const allowUpdate = userRoles?.KHACHHANG?.sua ?? false;
	const allowRemove = userRoles?.KHACHHANG?.xoa ?? false;

	const columns = [
		{
			title: "Mã khách hàng",
			dataIndex: "maKhachHang",
			key: "maKhachHang",
			filterMultiple: false,
			...columnSearchProps("maKhachHang")
		},
		{
			title: "Tên khách hàng",
			dataIndex: "tenKhachHang",
			key: "tenKhachHang",
			filterMultiple: false
		},
		{
			title: "Địa chỉ",
			dataIndex: "diaChi",
			key: "diaChi",
			filterMultiple: false
		},
		{
			title: "Số điện thoại",
			dataIndex: "sdt",
			key: "sdt",
			filterMultiple: false,
			align: "center"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			filterMultiple: false
		},
		// {
		// 	title: "Trang web",
		// 	dataIndex: "trangWeb",
		// 	key: "trangWeb",
		// 	filterMultiple: false,
		// 	render: data => <a href={`${data}`} target="_blank">{data}</a>
		// },
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
			title: "Thao tác",
			key: "action",
			width: "5%",
			align: "center",
			render: (text, record, index) => (
				<div key={index}>
					<Space>
						{allowUpdate ? (
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
						{allowRemove ? (
							<Popconfirm
								title="Xác nhận xóa khách hàng này?"
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
		const {
			maKhachHang,
			ngayBaoCao,
			tenTrangThai,
			tenNguoiBaoCao
		} = filters;
		const filtersParams = {
			search: maKhachHang?.[0] ?? ""
			// userFilter: tenNguoiBaoCao?.[0] ?? "",
			// reportTimeFilterFrom: ngayBaoCao?.[0] ?? null,
			// reportTimeFilterTo: ngayBaoCao?.[1] ?? null,
			// statusFilter: tenTrangThai?.[0] ?? ""
		};
		onParamsChange(filtersParams);
	};

	return (
		<Table
			columns={columns}
			dataSource={customers}
			pagination={false}
			onChange={handleParamsChange}
			size="small"
			rowKey="id"
		/>
	);
};

const mapStateTopProps = state => {
	return {
		userRoles: state.UserRole.userRoles,
		loading: state.loading.effects["customerDelete/deleteCustomerRequest"]
	};
};

export default connect(mapStateTopProps)(CustomerTable);
