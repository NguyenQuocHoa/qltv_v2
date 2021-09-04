import {
	DownloadOutlined,
	ExportOutlined,
	ImportOutlined,
	PlusOutlined
} from "@ant-design/icons";
import {
	Button,
	Col,
	InputNumber,
	notification,
	Pagination,
	Row,
	Spin,
	Upload
} from "antd";
import { connect, setLocale } from "umi";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReportTable from "./components/reportTable";
import qs from "query-string";
import styles from "./style.less";
import Search from "antd/lib/input/Search";
import { toDate, removeAccents } from "../../utils/utils";
import moment from "moment";
import xlsx from "xlsx";
import { CSVLink } from "react-csv";
import {
	dataTemplate,
	ExportHeader,
	importHeader,
	status,
	tasks
} from "./const";

setLocale("vi-VN", false);

const Report = props => {
	const {
		loading,
		reportResponse,
		deleteSuccess,
		noPagingResponse,
		noPagingSuccess,
		// currentUser,
		// currentUserSuccess,
		userRoles,
		importSuccess,
		dispatch
	} = props;
	const history = useHistory();
	const reports = reportResponse?.items ?? [];
	const total = reportResponse?.total ?? 0;
	const [filters, setFilters] = useState({
		search: "",
		userFilter: "",
		reportTimeFilterFrom: moment().startOf("month").format("YYYY-MM-DD"),
		reportTimeFilterTo: moment().endOf("month").format("YYYY-MM-DD"),
		statusFilter: "",
		column: "ngayBaoCao",
		dir: "desc",
		page: 1,
		p_size: 10
	});

	const getReportListRequest = currentFilterPayload => {
		history.push({
			pathname: "/report",
			search: qs.stringify(currentFilterPayload)
		});

		dispatch({
			type: "reportList/getReportListRequest",
			payload: currentFilterPayload
		});
	};

	const getCurrentUser = () => {
		dispatch({ type: "currentUser/getCurrentUserRequest" });
	};

	const handleParamsChange = filtersParams => {
		const from =
			filtersParams.reportTimeFilterFrom === null
				? filters.reportTimeFilterFrom
				: toDate(filtersParams.reportTimeFilterFrom);
		const to =
			filtersParams.reportTimeFilterTo === null
				? filters.reportTimeFilterTo
				: toDate(filtersParams.reportTimeFilterTo);
		setFilters({
			...filters,
			...filtersParams,
			reportTimeFilterFrom: from,
			reportTimeFilterTo: to
		});
	};

	const handlePageIndexChange = newPageIndex =>
		setFilters({ ...filters, page: newPageIndex });

	const handlePageSizeChange = newPageSize =>
		setFilters({ ...filters, p_size: newPageSize ?? 1 });

	useEffect(() => {
		getReportListRequest(filters);
	}, [filters]);

	useEffect(() => {
		getReportListRequest(filters);
		// getCurrentUser();
	}, []);

	useEffect(() => {
		if (deleteSuccess) {
			getReportListRequest(filters);
		}
	}, [deleteSuccess]);

	useEffect(() => {
		if (importSuccess) {
			getReportListRequest(filters);
		}
	}, [importSuccess]);

	const onSearch = value =>
		setFilters({ ...filters, search: value, page: 1 });

	const getNoPagingReports = () => {
		dispatch({
			type: "reportList/getReportListNoPagingRequest",
			payload: filters
		});
	};

	const exportData = React.createRef();
	const exportTemplate = React.createRef();

	const handleExport = () => {
		getNoPagingReports();
	};

	const handleDownloadTemplate = () => {
		setTimeout(() => {
			exportTemplate.current.link.click();
		}, 100);
	};

	useEffect(() => {
		if (noPagingSuccess) {
			// console.log("exportData", exportData);
			console.log("noPaging", noPagingResponse);
			setTimeout(() => {
				exportData.current.link.click();
			}, 100);
		}
	}, [noPagingSuccess]);

	const toBstr = file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsBinaryString(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});

	// limit type file import
	const propsUpload = {
		multiple: false,
		onChange: info => {
			// console.log("info", info);
			const status = info.file.status;
			if (status !== "uploading") {
				console.log("uploading");
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				console.log("upload done");
			} else if (status === "error") {
				console.log("upload failed");
			}
		},
		beforeUpload: file => {
			const listTypeFileExcel = [
				"application/vnd.ms-excel",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			];
			if (!listTypeFileExcel.includes(file.type)) {
				notification.error({
					message: "Lỗi import",
					description: `${file.name} không thuộc định dạng file EXCEL`,
					placement: "topRight"
				});
			} else {
				// console.log("file", file);
			}
		},
		maxCount: 1,
		showUploadList: false
	};
	// Upload file
	const uploadExcel = async options => {
		const { onSuccess, onError, file } = options;
		try {
			var bstr = await toBstr(file);
			var workbook = xlsx.read(bstr, { type: "binary" });
			var ws = workbook.Sheets[workbook.SheetNames[0]];
			var data = xlsx.utils.sheet_to_json(ws, { header: 1, raw: false });
			var validTemplate = 1;
			if (data[0].length === 0) {
				validTemplate = 0;
				notification.error({
					message: "Lỗi import",
					description: "Không tìm thấy các tiêu đề!"
				});
				throw new Error("Invalid file");
			}
			for (var i = 0; i < data[0].length; i++) {
				if (data[0][i] !== importHeader[i].label) {
					validTemplate = 0;
					notification.error({
						message: "Lỗi import",
						description: "Thứ tự tiêu đề chưa đúng!"
					});
					throw new Error("Invalid file");
				}
			}

			if (validTemplate) {
				let payload = [];
				for (let i = 1; i < data.length; i++) {
					var obj = {
						maDuAn: data[i][0],
						soGioDuKien: data[i][1],
						batDau: data[i][2],
						ketThuc: data[i][3],
						moTa: data[i][4],
						tenDangNhap: data[i][5],
						ngayBaoCao: new Date(data[i][6]),
						loai: tasks[removeAccents(data[i][7].toLowerCase())],
						trangThai:
							status[removeAccents(data[i][8].toLowerCase())]
					};
					payload.push(obj);
				}
				// console.log("[payload]", payload); // dispatch this payload to server
				dispatch({
					type: "reportImport/importReportsRequest",
					payload: payload
				});
			}
			onSuccess("Ok");
		} catch (err) {
			onError({ err });
		}
	};
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
							type="default"
							title="Download template"
							onClick={handleDownloadTemplate}
						>
							<DownloadOutlined />
						</Button>
						<CSVLink
							ref={exportTemplate}
							headers={importHeader}
							data={dataTemplate}
							filename="Import-template.csv"
						/>
					</Col>
					<Col>
						<Upload
							{...propsUpload}
							accept=".csv,
										application/vnd.ms-excel,
										application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							customRequest={uploadExcel}
						>
							<Button
								style={{ width: 54, height: 32 }}
								type="default"
								title="Import excel"
							>
								<ImportOutlined />
							</Button>
						</Upload>
					</Col>
					<Col>
						<Button
							type="default"
							title="Export excel"
							onClick={handleExport}
						>
							<ExportOutlined />
						</Button>
						<CSVLink
							ref={exportData}
							headers={ExportHeader}
							data={noPagingResponse}
							filename="BaoCaoExportExcel.csv"
						/>
					</Col>
					<Col>
						<Button
							onClick={() => {
								history.push("/report/create");
							}}
							type="primary"
							icon={<PlusOutlined />}
							disabled={!userRoles?.BAOCAO?.them ?? true}
						>
							Thêm mới
						</Button>
					</Col>
				</Row>
			</Row>
			<Row className={styles.mt16} s>
				<Col>
					Tổng số báo cáo:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>
			<div className={styles.mt16}>
				<ReportTable
					reports={reports}
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

// export default Report;
const mapStateToProps = state => {
	return {
		reportResponse: state.reportList.response,
		loading: state.loading.effects["reportList/getReportListRequest"],
		deleteSuccess: state.reportDelete.success,

		noPagingResponse: state.reportList.noPagingResponse,
		noPagingSuccess: state.reportList.noPagingSuccess,

		importSuccess: state.reportImport.success,

		currentUser: state.currentUser.response,
		currentUserSuccess: state.currentUser.success,

		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Report);
