import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Pagination, Row, Spin, Input } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import ProjectTable from "./components/projectTable";

const { Search } = Input;

const Project = props => {
	const { projectsPayload, dispatch, userRoles, loading, isDeleteSuccess } = props;
	const history = useHistory();
	const total = projectsPayload?.total || 0;
	const records = projectsPayload?.items || [];

	const [params, setParams] = useState({
		dir: "desc",
		search: "",
		page: 1,
		p_size: 10,
		column: "ngaytao"
	});

	const getProjectListRequest = params => {
		setParams(params);
		history.push({
			pathname: "/projects",
			search: qs.stringify(params)
		});

		dispatch({
			type: "projectList/getProjectListRequest",
			payload: params
		});
	};

	const handleSearchChange = e => {
		setParams({
			...params,
			search: e.target.value
		});
		getProjectListRequest({ ...params, search: e.target.value });
	};

	const handleSearchPress = () => {
		getProjectListRequest({ ...params });
	};

	const handlePageIndexChange = newPageIndex => {
		getProjectListRequest({ ...params, page: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getProjectListRequest({ ...params, page: 1, p_size: newPageSize });
	};

	const handleParamsChange = params => {};

	useEffect(() => {
		getProjectListRequest(params);
	}, []);

	useEffect(() => {
		getProjectListRequest(params);
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
							history.push("/projects/create");
						}}
						type="primary"
						icon={<PlusOutlined />}
						disabled={!userRoles?.DUAN?.them ?? true}
					>
						Thêm mới
					</Button>
				</Col>
			</Row>

			<Row className={styles.mt16}>
				<Col>
					Tổng số dự án: <span className={styles.title}>{total}</span>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<ProjectTable
					projects={records}
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
							<Col>Số dự án mỗi trang</Col>
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
		projectsPayload: state.projectList.payload,
		isDeleteSuccess: state.projectDelete.success,
		loading: state.loading.effects["projectList/getProjectListRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Project);
