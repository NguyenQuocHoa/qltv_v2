import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
// import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
import { toDateTime } from "../../../../utils/utils";
import styles from "./style.less";

const PermissionGroupTable = props => {
	const { handleParamsChange, userRoles, dispatch, pgs, loading } = props;
	// console.table("group role", pgs);
	const handleDeletePermissionGroup = id => {
		dispatch({
			type: "permissionGroupDelete/deletePermissionGroupRequest",
			id
		});
	};
	const allowUpdate = userRoles?.NHOMQUYEN?.sua ?? false;
	const allowRemove = userRoles?.NHOMQUYEN?.xoa ?? false;

	const columns = [
		{
			title: "Nhóm quyền",
			dataIndex: "groupRoleName",
			key: "groupRoleName",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>
					<Link
						to={
							userRoles?.PHANQUYEN?.sua
								? `/pgs/${record.id}`
								: "#"
						}
						className={styles.nor}
					>
						{record.groupRoleName}
					</Link>
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
			title: "Ngày tạo",
			dataIndex: "ngayTao",
			key: "ngayTao",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>{toDateTime(record.ngayTao)}</div>
			)
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
			render: (text, record, index) => (
				<div key={index}>
					<Space>
						{allowUpdate ? (
							<Link to={`/pgs/${record.id}`}>
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
								title="Xác nhận nhóm quyền này?"
								onConfirm={() => {
									handleDeletePermissionGroup(record.id);
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

	return (
		<Table
			columns={columns}
			dataSource={pgs}
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
			state.loading.effects[
				"permissionGroupDelete/deletePermissionGroupRequest"
			]
	};
};

export default connect(mapStateTopProps)(PermissionGroupTable);
