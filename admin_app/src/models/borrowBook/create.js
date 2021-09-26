import { notification } from "antd";
import { createBorrowBook } from "../../services/borrowBook";

const BorrowBookCreateModel = {
	namespace: "borrowBookCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createBorrowBookRequest({ payload }, { call, put }) {
			const response = yield call(createBorrowBook, payload);
			if (response?.code === 201) {
				notification.success({
					message: "Thêm phiếu mượn sách mới thành công"
				});
				yield put({
					type: "createBorrowBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createBorrowBookFailure",
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
		createBorrowBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createBorrowBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createBorrowBookFailure(state, action) {
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
export default BorrowBookCreateModel;
