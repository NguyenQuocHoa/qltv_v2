import React from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import columnSearchProps from "../../../shared/filterTableProps/columnSearchProps";
// import columnDatePickerProps from "../../../shared/filterTableProps/columnDatePickerProps";
import moment from "moment";

const ReturnBookTable = props => {
	const { onParamsChange, userRoles, dispatch, returnBooks, loading } = props;

	const date = moment();
	const customData = returnBooks.map(br => {
		return {
			...br,
			expiryDate: moment(br.returnDate)
				.add(br.numberOfDayReturn, "days")
				.diff(date, "days")
		};
	});

	const handleDeleteCustomer = id => {
		dispatch({
			type: "returnBookDelete/deleteReturnBookRequest",
			id
		});
	};

	// const allowUpdate = userRoles?.KHACHHANG?.sua ?? false;
	// const allowRemove = userRoles?.KHACHHANG?.xoa ?? false;

	const columns = [
		{
			title: "Mã phiếu trả sách",
			dataIndex: "returnBookCode",
			key: "returnBookCode",
			align: "center",
			filterMultiple: false,
			...columnSearchProps("Mã phiếu trả sách")
		},
		{
			title: "Ngày trả",
			dataIndex: "returnDate",
			key: "returnDate",
			align: "center",
			filterMultiple: false,
			render: (text, record, index) => (
				<div>{moment(text).format("DD/MM/YYYY")}</div>
			)
		},
		{
			title: "Mã sinh viên",
			dataIndex: "studentCode",
			key: "studentCode",
			align: "center",
			filterMultiple: false,
			...columnSearchProps("Mã sinh viên")
		},
		{
			title: "Tên sinh viên",
			dataIndex: "studentName",
			key: "studentName",
			align: "center",
			filterMultiple: false,
			...columnSearchProps("Tên sinh viên")
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
							<Link to={`/return-book/${record.id}`}>
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
								title="Xác nhận xóa phiếu trả sách này?"
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
			state.loading.effects["returnBookList/getReturnBookPagingRequest"]
	};
};

export default connect(mapStateTopProps)(ReturnBookTable);
