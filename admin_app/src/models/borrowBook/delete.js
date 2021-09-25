import { notification } from "antd";
import { deleteBorrowBook } from "../../services/borrowBook";

const BorrowBookDeleteModel = {
	namespace: "borrowBookDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteBorrowBookRequest({ id }, { call, put }) {
			const response = yield call(deleteBorrowBook, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa phiếu mượn sách"
				});
				yield put({
					type: "deleteBorrowBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteBorrowBookFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteBorrowBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteBorrowBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteBorrowBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BorrowBookDeleteModel;
