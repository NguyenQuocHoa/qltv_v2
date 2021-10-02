import { notification } from "antd";
import { createReturnBook } from "../../services/returnBook";

const ReturnBookCreateModel = {
	namespace: "returnBookCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createReturnBookRequest({ payload }, { call, put }) {
			const response = yield call(createReturnBook, payload);
			if (response?.code === 201) {
				notification.success({
					message: "Thêm phiếu trả sách mới thành công"
				});
				yield put({
					type: "createReturnBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createReturnBookFailure",
					payload: response
				});
			}
		},
		*clearState(_, { put }) {
			yield put({
				type: "clearStateSuccess"
			});
		}
	},
	reducers: {
		createReturnBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createReturnBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createReturnBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		},
		clearStateSuccess(state) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		}
	}
};
export default ReturnBookCreateModel;
