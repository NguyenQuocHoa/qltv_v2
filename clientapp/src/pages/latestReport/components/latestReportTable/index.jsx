import React from "react";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import styles from "./style.less";
import { toDateTime } from "../../../../utils/utils";
// setLocale("vi-VN", false);
const LatestReportTable = props => {
	const { onParamsChange, latestReports, userRoles } = props;
	const data =
		latestReports?.map((item, index) => {
			return { ...item, key: index };
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

	const columns = [
		{
			title: "STT",
			key: "index",
			render: (text, record, index) => index + 1
		},
		{
			title: "Tên nhân viên",
			dataIndex: "tenNhanVien",
			key: "tenNhanVien",
			align: "left",
			render: (text, record, index) => (
				<div>
					<Link
						to={
							userRoles?.NHANVIEN?.sua
								? `/users/${record.nhanVien_Id}`
								: "#"
						}
						className={styles.nor}
					>
						{text}
					</Link>
				</div>
			)
		},
		{
			title: "Dự án",
			dataIndex: "tenDuAn",
			key: "tenDuAn",
			align: "left",
			filterMultiple: false,
			// ...columnSearchProps("tenDuAn"),
			render: (text, record, index) => (
				<div>
					<Link
						to={
							userRoles?.DUAN?.sua
								? `/projects/${record.duAn_Id}`
								: "#"
						}
						className={styles.nor}
					>
						{record.tenDuAn}
					</Link>
				</div>
			)
		},
		{
			title: "Báo cáo gần nhất",
			dataIndex: "thoiGianBaoCao",
			key: "thoiGianBaoCao",
			align: "right",
			render: (text, record, index) => (
				<div>
					<Link
						to={
							userRoles?.BAOCAO?.sua
								? `/report/${record.baoCao_Id}`
								: "#"
						}
						className={styles.nor}
					>
						{toDateTime(text)}
					</Link>
				</div>
			)
		},
		{
			title: "Trạng thái",
			dataIndex: "trangThai",
			key: "trangThai",
			align: "center",
			filterMultiple: false,
			render: (text, record, index) => statusRender(text)
		}
	];

	const handleParamsChange = (pagination, filters, sorter) => {
		onParamsChange(filters);
	};

	return (
		<Table
			columns={columns}
			dataSource={data}
			pagination={false}
			onChange={handleParamsChange}
			size="small"
			rowKey="key"
		/>
	);
};

const mapStateTopProps = state => {
	return {
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateTopProps)(LatestReportTable);
