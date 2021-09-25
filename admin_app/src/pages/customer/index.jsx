/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin, Input } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import CustomerTable from "./components/customerTable";

const { Search } = Input;

const Customer = props => {
	const {
		customersPayload,
		deleteSuccess,
		userRoles,
		dispatch,
		loading
	} = props;
	const history = useHistory();
	const total = customersPayload?.total || 0;
	const records = customersPayload?.items || [];

	const [params, setParams] = useState({
		dir: "",
		search: "",
		page: 1,
		p_size: 10,
		column: ""
	});

	const getCustomerListRequest = params => {
		setParams(params);
		history.push({
			pathname: "/customers",
			search: qs.stringify(params)
		});

		dispatch({
			type: "customerList/getCustomerListRequest",
			payload: params
		});
	};

	const handleSearchChange = e => {
		setParams({
			...params,
			search: e.target.value
		});
		getCustomerListRequest({ ...params, search: e.target.value });
	};

	const handleSearchPress = () => {
		// getCustomerListRequest({ ...params });
	};

	const handlePageIndexChange = newPageIndex => {
		getCustomerListRequest({ ...params, page: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getCustomerListRequest({
			...params,
			page: 1,
			p_size: newPageSize ?? 1
		});
	};

	const handleParamsChange = filtersParams => {
		setParams({
			...params,
			search: filtersParams.search
		});
	};

	useEffect(() => {
		getCustomerListRequest(params);
	}, [params]);

	useEffect(() => {
		getCustomerListRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getCustomerListRequest(params);
		}
	}, [deleteSuccess]);

	// check have role view this page
	useEffect(() => {
		if (userRoles.KHACHHANG && !userRoles.KHACHHANG.xem) {
			localStorage.removeItem("auth_token");
			window.location.assign("/");
		}
	}, [userRoles.KHACHHANG]);

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
							history.push("/customers/create");
						}}
						type="primary"
						icon={<PlusOutlined />}
						disabled={!userRoles.KHACHHANG?.them ?? true}
					>
						Thêm mới
					</Button>
				</Col>
			</Row>

			<Row className={styles.mt16}>
				<Col>
					Tổng số khách hàng:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<CustomerTable
					customers={records}
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
							<Col>Số khách hàng mỗi trang</Col>
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
		customersPayload: state.customerList.payload,
		deleteSuccess: state.customerDelete.success,
		userRoles: state.UserRole.userRoles,
		loading: state.loading.effects["customerList/getCustomerListRequest"]
	};
};

export default connect(mapStateToProps)(Customer);
