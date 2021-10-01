import { notification } from "antd";
import { updateBorrowBook } from "../../services/borrowBook";

const BorrowBookUpdateModel = {
	namespace: "borrowBookUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateBorrowBookRequest({ payload }, { call, put }) {
			const response = yield call(updateBorrowBook, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật phiếu mượn sách thành công"
				});
				yield put({
					type: "updateBorrowBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updateBorrowBookFailure",
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
		updateBorrowBookRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updateBorrowBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateBorrowBookFailure(state, action) {
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
export default BorrowBookUpdateModel;
