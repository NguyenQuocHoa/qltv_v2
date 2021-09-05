import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import { users } from "../../const";
import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
import { subtractHours, toDateTime } from "../../../../utils/utils";
import { useEffect } from "react";
import { connect } from "umi";
import styles from "./style.less";
// setLocale("vi-VN", false);
const ReportTable = props => {
	const {
		onParamsChange,
		reports,
		usersResponse,
		userRoles,
		dispatch,
		loading
	} = props;
	const data = reports ?? [];

	const allowUpdate = userRoles?.BAOCAO?.sua ?? false;
	const allowRemove = userRoles?.BAOCAO?.xoa ?? false;

	const handleDeleteReport = id => {
		dispatch({
			type: "reportDelete/deleteReportRequest",
			id: id
		});
	};

	useEffect(() => {
		dispatch({ type: "userList/getAllListUserRequest" });
	}, []);

	const userFilters =
		usersResponse?.map(item => {
			return { text: item.tenNhanVien, value: item.tenDangNhap };
		}) ?? [];

	const statusRender = statusName => {
		if (statusName === "Hoàn thành") {
			return (
				<Tag className={styles.title} color="blue">
					Hoàn thành
				</Tag>
			);
		}
		if (statusName === "Chưa hoàn thành") {
			return (
				<Tag className={styles.title} color="red">
					Chưa hoàn thành
				</Tag>
			);
		}
		return (
			<Tag className={styles.title} color="#f50">
				Chưa thiết lập
			</Tag>
		);
	};
	const StatusMap = [
		{ text: "Hoàn thành", value: 3049 },
		{ text: "Chưa hoàn thành", value: 3048 },
		{ text: "Chưa thiết lập", value: 0 }
	];
	const columns = [
		{
			title: "STT",
			key: "index",
			render: (text, record, index) => index + 1
		},
		{
			title: "Dự án",
			dataIndex: "tenDuAn",
			key: "tenDuAn",
			align: "left",
			filterMultiple: false,
			...columnSearchProps("tenDuAn"),
			render: (text, record, index) => (
				<div>
					<Link
						to={`/projects/${record.duAn_ID}`}
						className={styles.nor}
					>
						{record.tenDuAn}
					</Link>
				</div>
			)
		},
		{
			title: "Số giờ dự kiến",
			dataIndex: "soGioDuKien",
			key: "soGioDuKien",
			align: "right"
			// filterMultiple: false,
		},
		{
			title: "Bắt đầu",
			dataIndex: "batDau",
			key: "batDau",
			align: "right",
			filterMultiple: false
		},
		{
			title: "kết thúc",
			dataIndex: "ketThuc",
			key: "ketThuc",
			align: "right",
			filterMultiple: false
		},
		{
			title: "Tổng số giờ",
			dataIndex: "batDau",
			key: "batDau",
			align: "right",
			render: (text, row) => subtractHours(row.batDau, row.ketThuc),

			filterMultiple: false
		},
		{
			title: "Người báo cáo",
			dataIndex: "tenNguoiBaoCao",
			key: "tenNguoiBaoCao",
			filterMultiple: false,
			filters: userFilters,
			render: (text, row) => (
				<div>
					<Link
						className={styles.nor}
						to={`/users/${row.nhanVien_ID}`}
					>
						{text}
					</Link>
				</div>
			)
		},
		{
			title: "Ngày báo cáo",
			dataIndex: "ngayBaoCao",
			key: "ngayBaoCao",
			render: text => toDateTime(text),
			align: "right",
			...columnDatePickerProps("ngayBaoCao")
		},
		{
			title: "Công việc",
			dataIndex: "tenNhom",
			key: "tenNhom",
			align: "left",
			filterMultiple: false
		},
		{
			title: "Trạng thái",
			dataIndex: "tenTrangThai",
			key: "tenTrangThai",
			align: "center",
			filterMultiple: false,
			render: (text, record, index) => statusRender(text),
			filters: StatusMap
		},
		{
			title: "Thao tác",
			key: "action",
			align: "center",
			with: "5%",
			render: (text, record, index) => (
				<div key={index}>
					<Space size="middle">
						{allowUpdate ? (
							<Link to={`/report/${record.id}`}>
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
								title="Xác nhận xóa báo cáo này?"
								onConfirm={() => {
									handleDeleteReport(record.id);
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
		const { tenDuAn, ngayBaoCao, tenTrangThai, tenNguoiBaoCao } = filters;
		const filtersParams = {
			search: tenDuAn?.[0] ?? "",
			userFilter: tenNguoiBaoCao?.[0] ?? "",
			reportTimeFilterFrom: ngayBaoCao?.[0] ?? null,
			reportTimeFilterTo: ngayBaoCao?.[1] ?? null,
			statusFilter: tenTrangThai?.[0] ?? ""
		};
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

export default connect(mapStateTopProps)(ReportTable);
