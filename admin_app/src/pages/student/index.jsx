/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin } from "antd";
import { useHistory } from "react-router";
import styles from "../shared/style/listStyle.less";
import qs from "query-string";
import StudentTable from "./components/studentTable";

const Student = props => {
	const {
		studentsPayload,
		deleteSuccess,
		userRoles,
		dispatch,
		loading
	} = props;
	const history = useHistory();
	const total = studentsPayload?.total || 0;
	const records = studentsPayload?.items || [];

	const [params, setParams] = useState({
		pageIndex: 1,
		pageSize: 10,
		sortColumn: "id",
		sortOrder: 1
	});

	const [body, setBody] = useState([]);

	const getAllStudentRequest = (params, filterParams) => {
		console.log("params", params);
		setParams(params);
		history.push({
			pathname: "/students",
			search: qs.stringify(params)
		});

		dispatch({
			type: "studentList/getStudentPagingRequest",
			payload: { params, body: [] }
		});
	};

	const handlePageIndexChange = newPageIndex => {
		getAllStudentRequest({ ...params, pageIndex: newPageIndex }, body);
	};

	const handlePageSizeChange = newPageSize => {
		getAllStudentRequest(
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
		getAllStudentRequest(params);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getAllStudentRequest(params, body);
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
					Tổng số sinh viên:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
				<Col>
					<Button
						onClick={() => {
							history.push("/students/create");
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
				<StudentTable
					students={records}
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
							<Col>Số sinh viên mỗi trang</Col>
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
		studentsPayload: state.studentList.payload,
		deleteSuccess: state.studentDelete.success,
		// userRoles: state.UserRole.userRoles,
		loading: state.loading.effects["studentList/getStudentPagingRequest"]
	};
};

export default connect(mapStateToProps)(Student);
