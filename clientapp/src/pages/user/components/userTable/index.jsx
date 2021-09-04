import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import styles from "./style.less";
const UserTable = props => {
	const { onParamsChange, users, userRoles, dispatch, loading } = props;
	const data = users ?? [];

	const allowUpdate = userRoles?.NHANVIEN?.sua ?? false;
	const allowRemove = userRoles?.NHANVIEN?.xoa ?? false;

	const handleDeleteUser = id => {
		dispatch({
			type: "userDelete/deleteUserRequest",
			id: id
		});
	};

	const statusRender = status => {
		return status ? (
			<Tag className={styles.title} color="blue">
				Sử dụng
			</Tag>
		) : (
			<Tag className={styles.title} color="red">
				Ngừng sử dụng
			</Tag>
		);
	};
	const columns = [
		{
			title: "STT",
			key: "index",
			render: (text, record, index) => index + 1
		},
		{
			title: "Tên đăng nhập",
			dataIndex: "tenDangNhap",
			key: "tenDangNhap",
			align: "left"
		},
		{
			title: "Tên nhân viên",
			dataIndex: "tenNhanVien",
			key: "tenNhanVien",
			align: "left",
			render: (text, record, index) => (
				<div>
					<Link to={`/users/${record.id}`} className={styles.nor}>
						{text}
					</Link>
				</div>
			)

			// filterMultiple: false,
		},
		{
			title: "Điện thoại",
			dataIndex: "sdt",
			key: "sdt",
			align: "left"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			align: "left"
		},
		{
			title: "Ghi chú",
			dataIndex: "ghiChu",
			key: "ghiChu",
			align: "left"
		},
		{
			title: "Trạng thái",
			dataIndex: "isActive",
			key: "isAcitve",
			align: "center",
			render: (text, record, index) => statusRender(text)
		},
		{
			title: "Thao tác",
			key: "action",
			align: "center",
			with: "4%",
			render: (text, record, index) => (
				<div key={index}>
					<Space size="middle">
						{allowUpdate ? (
							<Link to={`/users/${record.id}`}>
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
								title="Xác nhân viên này?"
								onConfirm={() => {
									handleDeleteUser(record.id);
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
		const filtersParams = filters;
		onParamsChange(filtersParams);
	};

	return (
		<Table
			columns={columns}
			dataSource={data}
			pagination={false}
			onChange={handleParamsChange}
			size="small"
			rowKey="id"
		/>
	);
};

const mapStateTopProps = state => {
	return {
		usersResponse: state.userList.allUserResponse,
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateTopProps)(UserTable);
