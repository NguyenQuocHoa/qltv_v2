/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin } from "antd";
import { useHistory } from "react-router";
import styles from "../shared/style/listStyle.less";
import qs from "query-string";
import AccountTable from "./components/accountTable";

const Account = props => {
	const {
		accountsPayload,
		deleteSuccess,
		userRoles,
		dispatch,
		loading
	} = props;
	const history = useHistory();
	const total = accountsPayload?.total || 0;
	const records = accountsPayload?.items || [];

	const [params, setParams] = useState({
		pageIndex: 1,
		pageSize: 10,
		sortColumn: "id",
		sortOrder: 1
	});

	const [body, setBody] = useState([]);

	const getAllAccountRequest = (params, filterParams) => {
		console.log("params", params);
		setParams(params);
		history.push({
			pathname: "/accounts",
			search: qs.stringify(params)
		});

		dispatch({
			type: "accountList/getAccountPagingRequest",
			payload: { params, body: [] }
		});
	};

	const handlePageIndexChange = newPageIndex => {
		getAllAccountRequest({ ...params, pageIndex: newPageIndex }, body);
	};

	const handlePageSizeChange = newPageSize => {
		getAllAccountRequest(
			{
				...params,
				pageIndex: 1,
				pageSize: newPageSize ?? 1
			},
			body
		);
	};

	const handleParamsChange = filtersParams => {
		setParams({
			...params,
			search: filtersParams.search
		});
	};

	useEffect(() => {
		getAllAccountRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getAllAccountRequest(params, body);
		}
	}, [deleteSuccess]);

	// check have role view this pageIndex
	// useEffect(() => {
	// 	if (userRoles.KHACHHANG && !userRoles.KHACHHANG.xem) {
	// 		localStorage.removeItem("auth_token");
	// 		window.location.assign("/");
	// 	}
	// }, [userRoles.KHACHHANG]);

	return (
		<div className={styles.container}>
			<Row className={styles.mt16} justify="space-between">
				<Col>
					T???ng s??? t??i kho???n:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
				<Col>
					<Button
						onClick={() => {
							history.push("/accounts/create");
						}}
						type="primary"
						icon={<PlusOutlined />}
						// disabled={!userRoles.KHACHHANG?.them ?? true}
					>
						Th??m m???i
					</Button>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<AccountTable
					accounts={records}
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
							current={params.pageIndex}
							pageSize={params.pageSize}
							total={total}
							onChange={handlePageIndexChange}
						/>
					</Col>
					<Col>
						<Spin spinning={loading} />
					</Col>
					<Col>
						<Row justify="center" align="middle" gutter={[8, 8]}>
							<Col>S??? t??i kho???n m???i trang</Col>
							<Col>
								<InputNumber
									style={{ width: 60 }}
									min={1}
									max={100}
									value={params.pageSize}
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
		accountsPayload: state.accountList.payload,
		deleteSuccess: state.accountDelete.success,
		// userRoles: state.UserRole.userRoles,
		loading: state.loading.effects["accountList/getAccountPagingRequest"]
	};
};

export default connect(mapStateToProps)(Account);
