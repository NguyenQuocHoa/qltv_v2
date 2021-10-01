import { notification } from "antd";
import { updateReport } from "../../services/report";
const ReportUpdateModel = {
	namespace: "reportUpdate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*updateReportRequest({ payload }, { call, put }) {
			const response = yield call(updateReport, payload);
			if (response?.status === 400) {
				notification.error({
					message: "Cập nhật báo cáo không thành công!"
				});
				yield put({
					type: "updateReportFailure",
					payload: response
				});
			} else {
				notification.success({
					message: "Cập nhật báo cáo thành công"
				});
				yield put({
					type: "updateReportSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateReportRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		updateReportSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		updateReportFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default ReportUpdateModel;
