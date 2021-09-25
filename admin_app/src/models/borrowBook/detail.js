import { notification } from "antd";
import { getBorrowBookDetail } from "../../services/borrowBook";

const BorrowBookDetailModel = {
	namespace: "borrowBookDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getBorrowBookDetailRequest({ id }, { call, put }) {
			const response = yield call(getBorrowBookDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getBorrowBookDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getBorrowBookDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getBorrowBookDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getBorrowBookDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getBorrowBookDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default BorrowBookDetailModel;
