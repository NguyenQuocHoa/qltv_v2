/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import BookTable from "./components/bookTable";

const Book = props => {
	const { booksPayload, deleteSuccess, userRoles, dispatch, loading } = props;
	const history = useHistory();
	const total = booksPayload?.total || 0;
	const records = booksPayload?.items || [];

	const [params, setParams] = useState({
		pageIndex: 1,
		pageSize: 10,
		sortColumn: "id",
		sortOrder: 1
	});

	const [body, setBody] = useState([]);

	const getAllBookRequest = params => {
		setParams(params);
		history.push({
			pathname: "/books",
			search: qs.stringify(params)
		});

		dispatch({
			type: "bookList/getBookPagingRequest",
			payload: { params, body: [] }
		});
	};

	const handlePageIndexChange = newPageIndex => {
		getAllBookRequest({ ...params, pageIndex: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getAllBookRequest({
			...params,
			pageIndex: 1,
			pageSize: newPageSize ?? 1
		});
	};

	const handleParamsChange = filtersParams => {
		setParams({
			...params,
			search: filtersParams.search
		});
	};

	useEffect(() => {
		getAllBookRequest(params);
	}, [params]);

	useEffect(() => {
		getAllBookRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getAllBookRequest(params, body);
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
					Tổng số sách: <span className={styles.title}>{total}</span>
				</Col>
				<Col>
					<Button
						onClick={() => {
							history.push("/books/create");
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
				<BookTable
					books={records}
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
							<Col>Số sách mỗi trang</Col>
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
		booksPayload: state.bookList.payload,
		deleteSuccess: state.bookDelete.success,
		// userRoles: state.UserRole.userRoles,
		loading: state.loading.effects["bookList/getBookPagingRequest"]
	};
};

export default connect(mapStateToProps)(Book);
