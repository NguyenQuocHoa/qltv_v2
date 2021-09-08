/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin, Input } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import StaffGroupTable from "./components/staffGroupTable";

const { Search } = Input;

const StaffGroup = props => {
	const { staffGroupsPayload, deleteSuccess, userRoles, dispatch, loading } = props;
	const history = useHistory();
	const total = staffGroupsPayload?.total || 0;
	const records = staffGroupsPayload?.items || [];

	const [params, setParams] = useState({
		dir: "",
		search: "",
		page: 1,
		p_size: 10,
		column: ""
	});

	const getStaffGroupListRequest = params => {
		setParams(params);
		history.push({
			pathname: "/staffGroups",
			search: qs.stringify(params)
		});

		dispatch({
			type: "staffGroupList/getStaffGroupListRequest",
			payload: params
		});
	};

	const handleSearchChange = e => {
		setParams({
			...params,
			search: e.target.value
		});
		getStaffGroupListRequest({ ...params, search: e.target.value });
	};

	const handleSearchPress = () => {
		// getStaffGroupListRequest({ ...params });
	};

	const handlePageIndexChange = newPageIndex => {
		getStaffGroupListRequest({ ...params, page: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getStaffGroupListRequest({
			...params,
			page: 1,
			p_size: newPageSize ?? 1
		});
	};

	const handleParamsChange = filtersParams => {
		// const from =
		// 	filtersParams.reportTimeFilterFrom === null
		// 		? filters.reportTimeFilterFrom
		// 		: toDate(filtersParams.reportTimeFilterFrom);
		// const to =
		// 	filtersParams.reportTimeFilterTo === null
		// 		? filters.reportTimeFilterTo
		// 		: toDate(filtersParams.reportTimeFilterTo);;
		setParams({
			...params,
			search: filtersParams.search
			// column: "maKhachHang"
			// reportTimeFilterFrom: from,
			// reportTimeFilterTo: to
		});
	};

	useEffect(() => {
		getStaffGroupListRequest(params);
	}, [params]);

	useEffect(() => {
		getStaffGroupListRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getStaffGroupListRequest(params);
		}
	}, [deleteSuccess]);

	// check have role view this page
	useEffect(() => {
		if (userRoles.NHOMNHANVIEN && !userRoles.NHOMNHANVIEN.xem) {
			localStorage.removeItem("auth_token");
			window.location.assign("/");
		}
	}, [userRoles.NHOMNHANVIEN]);

	return (
		<div className={styles.container}>
			<Row justify="space-between" align="middle">
				<Col xs={8}>
					<Search
						placeholder="Tìm kiếm"
						value={params.search}
						onChange={handleSearchChange}
						onSearch={handleSearchPress}
						enterButton
					/>
				</Col>
				<Spin spinning={loading} />
				<Col>
					<Button
						onClick={() => {
							history.push("/staffGroups/create");
						}}
						type="primary"
						icon={<PlusOutlined />}
						disabled={!userRoles?.NHOMNHANVIEN?.them ?? true}
					>
						Thêm mới
					</Button>
				</Col>
			</Row>

			<Row className={styles.mt16}>
				<Col>
					Tổng số nhóm nhân viên:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<StaffGroupTable
					staffGroups={records}
					onParamsChange={handleParamsChange}
				/>
			</div>

			{total !== 0 ? (
				<Row
					justify="space-between"
					gutter={16}
					className={styles.mt16}
				>
					<Col>
						<Pagination
							showSizeChanger={false}
							current={params.page}
							pageSize={params.p_size}
							total={total}
							onChange={handlePageIndexChange}
						/>
					</Col>
					<Col>
						<Spin spinning={loading} />
					</Col>
					<Col>
						<Row justify="center" align="middle" gutter={[8, 8]}>
							<Col>Số nhóm nhân viên mỗi trang</Col>
							<Col>
								<InputNumber
									style={{ width: 60 }}
									min={1}
									max={100}
									value={params.p_size}
									onChange={handlePageSizeChange}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			) : null}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		staffGroupsPayload: state.staffGroupList.payload,
		deleteSuccess: state.staffGroupDelete.success,
		userRoles: state.UserRole.userRoles,
		loading:
			state.loading.effects["staffGroupList/getStaffGroupListRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(StaffGroup);
