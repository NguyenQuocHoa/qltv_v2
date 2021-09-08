import { notification } from "antd";
import { createReport } from "../../services/report";
const ReportCreateModel = {
	namespace: "reportCreate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*createReportRequest({ payload }, { call, put }) {
			const response = yield call(createReport, payload);
			if (response?.status === 400) {
				notification.error({
					message: "Tạo báo cáo không thành công!"
				});
				yield put({
					type: "createReportFailure",
					payload: response
				});
			} else {
				notification.success({
					message: "Tạo báo cáo thành công"
				});
				yield put({
					type: "createReportSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		createReportRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		createReportSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		createReportFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default ReportCreateModel;
