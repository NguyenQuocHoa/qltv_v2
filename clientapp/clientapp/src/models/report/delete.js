import { notification } from "antd";
import { deleteReport } from "../../services/report";
const ReportDeleteModel = {
	namespace: "reportDelete",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteReportRequest({ id }, { call, put }) {
			const response = yield call(deleteReport, id);
			if (response?.statusCode === 404) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "deleteReportFailure",
					payload: response
				});
			} else {
				notification.success({
					message: "Xóa báo cáo thành công"
				});
				yield put({
					type: "deleteReportSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteReportRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		deleteReportSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		deleteReportFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default ReportDeleteModel;
