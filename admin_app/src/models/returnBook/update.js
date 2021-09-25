import { notification } from "antd";
import { updateReturnBook } from "../../services/returnBook";

const ReturnBookUpdateModel = {
	namespace: "returnBookUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateReturnBookRequest({ payload }, { call, put }) {
			const response = yield call(updateReturnBook, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật phiếu trả sách thành công"
				});
				yield put({
					type: "updateReturnBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updateReturnBookFailure",
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
		updateReturnBookRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updateReturnBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateReturnBookFailure(state, action) {
			return {
				...state,
				payload: action.payload,
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
export default ReturnBookUpdateModel;
