import React from "react";
import {
	DeleteOutlined,
	FormOutlined,
	CheckCircleTwoTone,
	CloseCircleTwoTone
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
import styles from "../../../shared/style/tableStyle.less";
import moment from "moment";

const BorrowBookTable = props => {
	const { onParamsChange, userRoles, dispatch, borrowBooks, loading } = props;

	const date = moment();
	const customData = borrowBooks.map(br => {
		return {
			...br,
			expiryDate: moment(br.borrowDate)
				.add(br.numberOfDayBorrow, "days")
				.diff(date, "days")
		};
	});

	const handleDeleteCustomer = id => {
		dispatch({
			type: "borrowBookDelete/deleteBorrowBookRequest",
			id
		});
	};

	// const allowUpdate = userRoles?.KHACHHANG?.sua ?? false;
	// const allowRemove = userRoles?.KHACHHANG?.xoa ?? false;

	const columns = [
		{
			title: "Mã phiếu mượn sách",
			dataIndex: "borrowBookCode",
			key: "borrowBookCode",
			align: "center",
			filterMultiple: false,
			...columnSearchProps("Mã phiếu mượn sách")
		},
		{
			title: "Ngày mượn",
			dataIndex: "borrowDate",
			key: "borrowDate",
			align: "center",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>{moment(text).format("DD/MM/YYYY")}</div>
			)
		},
		{
			title: "Đã trả sách",
			dataIndex: "isReturn",
			key: "isReturn",
			align: "center",
			filterMultiple: false,
			render: data => (
				<div>
					{data ? (
						<CheckCircleTwoTone twoToneColor="#52c41a" />
					) : (
						<CloseCircleTwoTone twoToneColor="#eb2f96" />
					)}
				</div>
			)
		},
		{
			title: "Số ngày mượn",
			dataIndex: "numberOfDayBorrow",
			key: "numberOfDayBorrow",
			align: "center",
			filterMultiple: false
		},
		{
			title: "Số ngày tới hạn",
			dataIndex: "expiryDate",
			key: "expiryDate",
			align: "center",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>
					{record.isReturn && (
						<Tag className={styles.tagCustom} color="default">
							{"NA"}
						</Tag>
					)}
					{!record.isReturn && text > 20 && (
						<Tag className={styles.tagCustom} color="#87d068">
							{text}
						</Tag>
					)}
					{!record.isReturn && text <= 20 && text > 10 && (
						<Tag className={styles.tagCustom} color="#2db7f5">
							{text}
						</Tag>
					)}
					{!record.isReturn && text <= 10 && text >= 0 && (
						<Tag className={styles.tagCustom} color="#f50">
							{text}
						</Tag>
					)}
					{!record.isReturn && text < 0 && (
						<Tag className={styles.tagCustom} color="#cd201f">
							{text}
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
							<Link to={`/borrow-book/${record.id}`}>
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
								title="Xác nhận xóa phiếu mượn sách này?"
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
			dataSource={customData}
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
		loading:
			state.loading.effects["borrowBookList/getBorrowBookPagingRequest"]
	};
};

export default connect(mapStateTopProps)(BorrowBookTable);
