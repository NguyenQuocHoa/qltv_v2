/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin, Input } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import PermissionGroupTable from "./components/permissionGroupTable";

const { Search } = Input;

const PermissionGroup = props => {
	const { pgsPayload, dispatch, userRoles, loading, isDeleteSuccess } = props;
	const history = useHistory();
	const total = pgsPayload?.total || 0;
	const records = pgsPayload?.items || [];

	const [params, setParams] = useState({
		dir: "desc",
		search: "",
		page: 1,
		p_size: 10,
		column: "ngaytao"
	});

	const getPermissionGroupListRequest = params => {
		setParams(params);
		history.push({
			pathname: "/pgs",
			search: qs.stringify(params)
		});

		dispatch({
			type: "permissionGroupList/getPermissionGroupListRequest",
			payload: params
		});
	};

	const handleSearchChange = e => {
		setParams({
			...params,
			search: e.target.value
		});
		getPermissionGroupListRequest({ ...params, search: e.target.value });
	};

	const handleSearchPress = () => {
		getPermissionGroupListRequest({ ...params });
	};

	const handlePageIndexChange = newPageIndex => {
		getPermissionGroupListRequest({ ...params, page: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getPermissionGroupListRequest({
			...params,
			page: 1,
			p_size: newPageSize ?? 1
		});
	};

	const handleParamsChange = params => {};

	useEffect(() => {
		getPermissionGroupListRequest(params);
	}, []);

	useEffect(() => {
		getPermissionGroupListRequest(params);
	}, [isDeleteSuccess]);

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
							history.push("/pgs/create");
						}}
						type="primary"
						icon={<PlusOutlined />}
						disabled={!userRoles?.NHOMQUYEN?.them ?? true}
					>
						Thêm mới
					</Button>
				</Col>
			</Row>

			<Row className={styles.mt16}>
				<Col>
					Tổng số nhóm quyền:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<PermissionGroupTable
					pgs={records}
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
							<Col>Số nhóm quyền mỗi trang</Col>
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
		pgsPayload: state.permissionGroupList.payload,
		isDeleteSuccess: state.permissionGroupDelete.success,
		userRoles: state.UserRole.userRoles,
		loading:
			state.loading.effects[
				"permissionGroupList/getPermissionGroupListRequest"
			]
	};
};

export default connect(mapStateToProps)(PermissionGroup);
