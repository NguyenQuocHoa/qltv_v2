/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin } from "antd";
import { useHistory } from "react-router";
import styles from "../shared/style/listStyle.less";
import qs from "query-string";
import BorrowBookTable from "./components/borrowBookTable";

const BorrowBook = props => {
	const {
		borrowBooksPayload,
		deleteSuccess,
		userRoles,
		dispatch,
		loading
	} = props;
	const history = useHistory();
	const total = borrowBooksPayload?.total || 0;
	const records = borrowBooksPayload?.items || [];

	const [params, setParams] = useState({
		pageIndex: 1,
		pageSize: 10,
		sortColumn: "id",
		sortOrder: 1,
		studentId: 0
	});

	const [body, setBody] = useState([]);

	const getAllBorrowBookRequest = (params, filterParams) => {
		console.log("params", params);
		setParams(params);
		history.push({
			pathname: "/borrow-book",
			search: qs.stringify(params)
		});

		dispatch({
			type: "borrowBookList/getBorrowBookPagingRequest",
			payload: { params, body: [] }
		});
	};

	const handlePageIndexChange = newPageIndex => {
		getAllBorrowBookRequest({ ...params, pageIndex: newPageIndex }, body);
	};

	const handlePageSizeChange = newPageSize => {
		getAllBorrowBookRequest(
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
		getAllBorrowBookRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getAllBorrowBookRequest(params, body);
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
					Tổng số phiếu mượn sách:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
				<Col>
					<Button
						onClick={() => {
							history.push("/borrow-book/create");
						}}
						type="primary"
						icon={<PlusOutlined />}
						// disabled={!userRoles.KHACHHANG?.them ?? true}
					>
						Thêm mới
					</Button>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<BorrowBookTable
					borrowBooks={records}
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
							<Col>Số phiếu mượn sách mỗi trang</Col>
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
		borrowBooksPayload: state.borrowBookList.payload,
		deleteSuccess: state.borrowBookDelete.success,
		// userRoles: state.UserRole.userRoles,
		loading:
			state.loading.effects["borrowBookList/getBorrowBookPagingRequest"]
	};
};

export default connect(mapStateToProps)(BorrowBook);
