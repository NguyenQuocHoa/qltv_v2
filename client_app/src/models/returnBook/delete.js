import { notification } from "antd";
import { deleteReturnBook } from "../../services/returnBook";

const ReturnBookDeleteModel = {
	namespace: "returnBookDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteReturnBookRequest({ id }, { call, put }) {
			const response = yield call(deleteReturnBook, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa phiếu trả sách"
				});
				yield put({
					type: "deleteReturnBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteReturnBookFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteReturnBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteReturnBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteReturnBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default ReturnBookDeleteModel;
