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
import moment from "moment";

const StudentTable = props => {
	const { onParamsChange, userRoles, dispatch, students, loading } = props;

	const handleDeleteCustomer = id => {
		dispatch({
			type: "studentDelete/deleteStudentRequest",
			id
		});
	};

	const handleResetPassword = id => {
		dispatch({
			type: "studentUpdate/resetPasswordRequest",
			id
		});
	};
	// const allowUpdate = userRoles?.KHACHHANG?.sua ?? false;
	// const allowRemove = userRoles?.KHACHHANG?.xoa ?? false;

	const columns = [
		{
			title: "Mã sinh viên",
			dataIndex: "studentCode",
			key: "studentCode",
			filterMultiple: false,
			...columnSearchProps("Mã sinh viên")
		},
		{
			title: "Tên sinh viên",
			dataIndex: "studentName",
			key: "studentName",
			filterMultiple: false,
			...columnSearchProps("Tên sinh viên")
		},
		{
			title: "Khóa",
			dataIndex: "course",
			key: "course",
			filterMultiple: false,
			...columnSearchProps("Khóa")
		},
		{
			title: "Khoa",
			dataIndex: "faculty",
			key: "faculty",
			filterMultiple: false,
			...columnSearchProps("Khoa")
		},
		{
			title: "Lớp",
			dataIndex: "class",
			key: "class",
			filterMultiple: false,
			...columnSearchProps("Lớp")
		},
		{
			title: "Ngày sinh",
			dataIndex: "doB",
			key: "doB",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>{moment(text).format("DD/MM/YYYY")}</div>
			)
		},
		{
			title: "Quê quán",
			dataIndex: "nativeLand",
			key: "nativeLand",
			filterMultiple: false,
			...columnSearchProps("Quê quán")
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
			title: "Thao tác",
			key: "action",
			width: "5%",
			align: "center",
			render: (text, record, index) => (
				<div key={index}>
					<Space>
						{true ? (
							<Link to={`/students/${record.id}`}>
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
								title="Xác nhận xóa sinh viên này?"
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
								title="Xác nhận đặt lại mật khẩu sinh viên này?"
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
			dataSource={students}
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
		loading: state.loading.effects["studentList/getStudentPagingRequest"]
	};
};

export default connect(mapStateTopProps)(StudentTable);
