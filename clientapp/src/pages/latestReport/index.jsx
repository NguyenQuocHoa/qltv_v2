import { Col, InputNumber, Pagination, Row, Spin } from "antd";
import { connect, setLocale } from "umi";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import LatestReportTable from "./components/latestReportTable";
import qs from "query-string";
import styles from "./style.less";
import Search from "antd/lib/input/Search";

setLocale("vi-VN", false);

const LatestReport = props => {
	const { loading, latestReportResponse, dispatch } = props;
	const history = useHistory();
	const latestReports = latestReportResponse ?? [];
	const total = latestReportResponse?.total ?? 0;
	const [filters, setFilters] = useState({ search: "" });

	const getLatestReportsRequest = currentFilterPayload => {
		history.push({
			pathname: "/latest-reports",
			search: qs.stringify(currentFilterPayload)
		});

		dispatch({
			type: "reportList/getLatestReportListRequest",
			payload: currentFilterPayload
		});
	};

	const handleParamsChange = filtersParams => {
		setFilters({
			...filters,
			...filtersParams
		});
	};
	const handlePageIndexChange = newPageIndex =>
		setFilters({ ...filters, page: newPageIndex });

	const handlePageSizeChange = newPageSize =>
		setFilters({ ...filters, p_size: newPageSize ?? 1 });

	useEffect(() => {
		getLatestReportsRequest(filters);
	}, [filters]);

	useEffect(() => {
		getLatestReportsRequest(filters);
		// getCurrentUser();
	}, []);

	const onSearch = value =>
		getLatestReportsRequest({ ...filters, search: value, page: 1 });

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
			</Row>
			<div className={styles.mt16}>
				<LatestReportTable
					latestReports={latestReports}
					onParamsChange={handleParamsChange}
				/>
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

// export default LatestReport;
const mapStateToProps = state => {
	return {
		latestReportResponse: state.reportList.latestReportResponse,
		loading: state.loading.effects["reportList/getLatestReportListRequest"],
		currentUser: state.currentUser.response,
		currentUserSuccess: state.currentUser.success
	};
};

export default connect(mapStateToProps)(LatestReport);
