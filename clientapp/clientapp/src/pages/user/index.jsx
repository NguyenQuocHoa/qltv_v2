import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	InputNumber,
	notification,
	Pagination,
	Row,
	Spin
} from "antd";
import { connect, setLocale } from "umi";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserTable from "./components/userTable";
import qs from "query-string";
import styles from "./style.less";
import Search from "antd/lib/input/Search";

setLocale("vi-VN", false);

const User = props => {
	const { loading, userResponse, deleteSuccess, userRoles, dispatch } = props;
	const history = useHistory();
	const users = userResponse?.items ?? [];
	const total = userResponse?.total ?? 0;

	const [filters, setFilters] = useState({
		search: "",
		column: "ngayBaoCao",
		dir: "desc",
		page: 1,
		p_size: 10
	});

	const getUserListRequest = currentFilterPayload => {
		history.push({
			pathname: "/users",
			search: qs.stringify(currentFilterPayload)
		});
		dispatch({
			type: "userList/getListUserRequest",
			payload: currentFilterPayload
		});
	};

	const handlePageIndexChange = newPageIndex =>
		setFilters({ ...filters, page: newPageIndex });

	const handlePageSizeChange = newPageSize =>
		setFilters({ ...filters, p_size: newPageSize ?? 1 });

	useEffect(() => {
		getUserListRequest(filters);
	}, [filters]);

	useEffect(() => {
		getUserListRequest(filters);
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getUserListRequest(filters);
		}
	}, [deleteSuccess]);

	const onSearch = value =>
		getUserListRequest({ ...filters, search: value, page: 1 });

	return (
		<div className={styles.container}>
			<Row justify="space-between" align="middle">
				<Col xs={8}>
					<Search
						placeholder="Nhập vào đây để tìm kiếm"
						onSearch={onSearch}
						enterButton
					/>
				</Col>
				<Row justify="end" gutter={8}>
					<Col>
						<Button
							onClick={() => {
								history.push("/users/create");
							}}
							type="primary"
							icon={<PlusOutlined />}
							disabled={!userRoles?.NHANVIEN?.them ?? true}
						>
							Thêm mới
						</Button>
					</Col>
				</Row>
			</Row>
			<Row className={styles.mt16} s>
				<Col>
					Tổng số nhân viên:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>
			<div className={styles.mt16}>
				<UserTable users={users} />
			</div>
			<Col>
				<Spin spinning={loading} size="large" />
			</Col>
			{total !== 0 ? (
				<Row
					justify="space-between"
					gutter={16}
					className={styles.mt16}
				>
					<Col>
						<Pagination
							showSizeChanger={false}
							current={filters.page}
							pageSize={filters.p_size}
							total={total}
							onChange={handlePageIndexChange}
						/>
					</Col>
					<Col>
						<Row justify="center" align="middle" gutter={[8, 8]}>
							<Col>Số báo cáo mỗi trang</Col>
							<Col>
								<InputNumber
									style={{ width: 60 }}
									min={1}
									max={100}
									value={filters.p_size}
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

// export default User;
const mapStateToProps = state => {
	return {
		userResponse: state.userList.userResponse,
		loading: state.loading.effects["userList/getListUserRequest"],
		deleteSuccess: state.userDelete.success,
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(User);
