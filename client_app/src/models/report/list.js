import { notification } from "antd";
import {
	getReportList,
	getReportListNoPaging,
	getLatestReportList
} from "../../services/report";
const ReportListModel = {
	namespace: "reportList",
	state: {
		response: [],
		success: false,
		failure: false,

		noPagingResponse: [],
		noPagingSuccess: false,
		noPagingFailure: false,

		latestReportResponse: [],
		fetchLatestSuccess: false,
		fetchLatestFailure: false
	},
	effects: {
		*getReportListRequest({ payload }, { call, put }) {
			const response = yield call(getReportList, payload);
			if (response?.status === 400) {
				notification.error({
					message: response.title
				});
				yield put({
					type: "getReportListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getReportListSuccess",
					payload: response
				});
			}
		},
		*getReportListNoPagingRequest({ payload }, { call, put }) {
			const response = yield call(getReportListNoPaging, payload);
			if (response?.status === 400) {
				notification.error({
					message: response.title
				});
				yield put({
					type: "getReportListNoPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getReportListNoPagingSuccess",
					payload: response
				});
			}
		},
		*getLatestReportListRequest({ payload }, { call, put }) {
			const response = yield call(getLatestReportList, payload);
			if (response?.status === 400) {
				notification.error({
					message: response.title
				});
				yield put({
					type: "getLatestReportListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getLatestReportListSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		// list paging request
		getReportListRequest(state, action) {
			return {
				...state,
				response: [],
				success: false,
				failure: false
			};
		},
		getReportListSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		getReportListFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		},
		// no paging request
		getReportListNoPagingRequest(state, action) {
			return {
				...state,
				noPagingResponse: [],
				noPagingSuccess: false,
				noPagingFailure: false
			};
		},
		getReportListNoPagingSuccess(state, action) {
			return {
				...state,
				noPagingResponse: action.payload,
				noPagingSuccess: true,
				noPagingFailure: false
			};
		},
		getReportListNoPagingFailure(state, action) {
			return {
				...state,
				noPagingSuccess: false,
				noPagingFailure: true
			};
		},
		// latest report request
		getLatestReportListRequest(state, action) {
			return {
				...state,
				latestReportResponse: [],
				fetchLatestSuccess: false,
				fetchLatestFailure: false
			};
		},
		getLatestReportListSuccess(state, action) {
			return {
				...state,
				latestReportResponse: action.payload,
				fetchLatestSuccess: true,
				fetchLatestFailure: false
			};
		},
		getLatestReportListFailure(state, action) {
			return {
				...state,
				fetchLatestSuccess: false,
				fetchLatestFailure: true
			};
		}
	}
};
export default ReportListModel;
