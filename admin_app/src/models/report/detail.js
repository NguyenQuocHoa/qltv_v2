import { notification } from "antd";
import { getReportDetail } from "../../services/report";
const ReportDetailModel = {
	namespace: "reportDetail",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*getReportDetailRequest({ id }, { call, put }) {
			const response = yield call(getReportDetail, id);
			if (response?.statusCode === 404) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getReportDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getReportDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getReportDetailRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		getReportDetailSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		getReportDetailFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default ReportDetailModel;
