import { notification } from "antd";
import { importReports } from "../../services/report";
const ReportImportModel = {
	namespace: "reportImport",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*importReportsRequest({ payload }, { call, put }) {
			const response = yield call(importReports, payload);
			if (response?.statusCode === 404) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "importReportsFailure",
					payload: response
				});
			} else {
				notification.success({
					message: "Import danh sách báo cáo từ file Excel thành công"
				});
				yield put({
					type: "importReportsSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		importReportsRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		importReportsSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		importReportsFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default ReportImportModel;
