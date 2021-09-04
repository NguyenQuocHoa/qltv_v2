import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
// import { toDate } from "../../../../utils/utils";
import styles from "./style.less";

const StaffGroupTable = props => {
	const { onParamsChange, dispatch, staffGroups, userRoles, loading } = props;
	const handleDeleteStaffGroup = id => {
		dispatch({
			type: "staffGroupDelete/deleteStaffGroupRequest",
			id
		});
	};
	const allowUpdate = userRoles?.NHOMNHANVIEN?.sua ?? false;
	const allowRemove = userRoles?.NHOMNHANVIEN?.xoa ?? false;
	const columns = [
		{
			title: "STT",
			key: "index",
			align: "center",
			render: (text, record, index) => index + 1
		},
		{
			title: "Mã nhóm nhân viên",
			dataIndex: "maNhomNhanVien",
			key: "maNhomNhanVien",
			align: "center",
			filterMultiple: false,
			...columnSearchProps("maNhomNhanVien")
		},
		{
			title: "Tên nhóm nhân viên",
			dataIndex: "tenNhomNhanVien",
			key: "tenNhomNhanVien",
			align: "center",
			filterMultiple: false
		},
		{
			title: "Tên người tạo",
			dataIndex: "tenNguoiTao",
			key: "tenNguoiTao",
			align: "center",
			filterMultiple: false
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
			dataIndex: "ghiChu",
			key: "ghiChu",
			filterMultiple: false
		},
		{
			title: "Thao tác",
			key: "action",
			render: (text, record, index) => (
				<div key={index}>
					<Space>
						{allowUpdate ? (
							<Link to={`/staffGroups/${record.id}`}>
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
								title="Xác nhận xóa nhóm nhân viên này?"
								onConfirm={() => {
									handleDeleteStaffGroup(record.id);
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
			maNhomNhanVien,
			ngayBaoCao,
			tenTrangThai,
			tenNguoiBaoCao
		} = filters;
		const filtersParams = {
			search: maNhomNhanVien?.[0] ?? ""
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
			dataSource={staffGroups}
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
		loading:
			state.loading.effects["staffGroupDelete/deleteStaffGroupRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateTopProps)(StaffGroupTable);
