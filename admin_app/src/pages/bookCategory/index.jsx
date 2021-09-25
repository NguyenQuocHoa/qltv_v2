/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin } from "antd";
import { useHistory } from "react-router";
import styles from "../shared/style/listStyle.less";
import qs from "query-string";
import BookCategoryTable from "./components/bookCategoryTable";

const BookCategory = props => {
	const {
		bookCategoriesPayload,
		deleteSuccess,
		userRoles,
		dispatch,
		loading
	} = props;
	const history = useHistory();
	const total = bookCategoriesPayload?.total || 0;
	const records = bookCategoriesPayload?.items || [];

	const [params, setParams] = useState({
		pageIndex: 1,
		pageSize: 10,
		sortColumn: "id",
		sortOrder: 1
	});

	const [body, setBody] = useState([]);

	const getAllBookCategoryRequest = (params, filterParams) => {
		setParams(params);
		history.push({
			pathname: "/book-category",
			search: qs.stringify(params)
		});

		dispatch({
			type: "bookCategoryList/getBookCategoryPagingRequest",
			payload: { params, body: [] }
		});
	};

	const handlePageIndexChange = newPageIndex => {
		getAllBookCategoryRequest({ ...params, pageIndex: newPageIndex }, body);
	};

	const handlePageSizeChange = newPageSize => {
		getAllBookCategoryRequest(
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
		getAllBookCategoryRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getAllBookCategoryRequest(params, body);
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
					Tổng số loại sách:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
				<Col>
					<Button
						onClick={() => {
							history.push("/book-category/create");
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
				<BookCategoryTable
					bookCategories={records}
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
							<Col>Số loại sách mỗi trang</Col>
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
		bookCategoriesPayload: state.bookCategoryList.payload,
		deleteSuccess: state.bookCategoryDelete.success,
		// userRoles: state.UserRole.userRoles,
		loading:
			state.loading.effects[
				"bookCategoryList/getBookCategoryPagingRequest"
			]
	};
};

export default connect(mapStateToProps)(BookCategory);
