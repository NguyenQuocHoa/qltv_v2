import { notification } from "antd";
import { getReturnBookDetail } from "../../services/returnBook";

const ReturnBookDetailModel = {
	namespace: "returnBookDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getReturnBookDetailRequest({ id }, { call, put }) {
			const response = yield call(getReturnBookDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getReturnBookDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getReturnBookDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getReturnBookDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getReturnBookDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getReturnBookDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default ReturnBookDetailModel;
