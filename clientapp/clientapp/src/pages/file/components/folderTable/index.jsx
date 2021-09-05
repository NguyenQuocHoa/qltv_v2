import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import styles from "./style.less";
import moment from "moment";

const FolderTable = props => {
	const { handleParamsChange, userRoles, dispatch, folders, loading } = props;
	const handleDeleteFolder = id => {
		dispatch({
			type: "folderDelete/deleteFolderRequest",
			id
		});
	};

	const allowUpdate = userRoles?.FILE?.sua ?? false;
	const allowRemove = userRoles?.FILE?.xoa ?? false;
	const columns = [
		{
			title: "Tên thư mục",
			dataIndex: "tenNhom",
			key: "tenNhom",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>
					<Link to={`/folders/${record.id}`} className={styles.nor}>
						{record.tenNhom}
					</Link>
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
							<Link to={`/folders/${record.id}`}>
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
								title="Xác nhận xóa thư mục này?"
								onConfirm={() => {
									handleDeleteFolder(record.id);
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
			dataSource={folders}
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
		loading: state.loading.effects["folderDelete/deleteFolderRequest"]
	};
};

export default connect(mapStateTopProps)(FolderTable);
