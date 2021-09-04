import {
	DeleteOutlined,
	FormOutlined,
	UnorderedListOutlined
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "umi";
import styles from "./style.less";

const ProjectTable = props => {
	const {
		handleParamsChange,
		dispatch,
		projects,
		userRoles,
		loading
	} = props;

	const allowUpdate = userRoles?.DUAN?.sua ?? false;
	const allowRemove = userRoles?.DUAN?.xoa ?? false;

	const handleDeleteProject = id => {
		dispatch({
			type: "projectDelete/deleteProjectRequest",
			id
		});
	};
	const columns = [
		{
			title: "Mã dự án",
			dataIndex: "maDuAn",
			filterMultiple: false
		},
		{
			title: "Tên dự án",
			dataIndex: "tenDuAn",
			key: "tenDuAn",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>
					<Link to={`/projects/${record.id}`} className={styles.nor}>
						{record.tenDuAn}
					</Link>
				</div>
			)
		},
		{
			title: "Tên khách hàng",
			dataIndex: "tenKhachHang",
			key: "tenKhachHang",
			filterMultiple: false
		},
		{
			title: "Ngày bắt đầu",
			dataIndex: "ngayBatDau",
			key: "ngayBatDau",
			filterMultiple: false,
			align: "center",
			render: data => <div>{moment(data).format("DD/MM/YYYY")}</div>
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
			align: "center",

			render: (text, record, index) => (
				<div key={index}>
					<Space>
						{allowUpdate ? (
							<Link to={`/projects/${record.id}`}>
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
						<Link to={`/backlogs/${record.id}`}>
							<Tooltip title="Xem backlog">
								<Button
									type="link"
									icon={<UnorderedListOutlined />}
								/>
							</Tooltip>
						</Link>
						{allowRemove ? (
							<Popconfirm
								title="Xác nhận xóa dự án này?"
								onConfirm={() => {
									handleDeleteProject(record.id);
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
			dataSource={projects}
			pagination={false}
			onChange={handleParamsChange}
			size="small"
			rowKey="id"
		/>
	);
};

const mapStateTopProps = state => {
	return {
		loading: state.loading.effects["projectDelete/deleteProjectRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateTopProps)(ProjectTable);
