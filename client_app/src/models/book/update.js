import { notification } from "antd";
import { updateBook } from "../../services/book";

const BookUpdateModel = {
	namespace: "bookUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateBookRequest({ payload }, { call, put }) {
			const response = yield call(updateBook, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật sách thành công"
				});
				yield put({
					type: "updateBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updateBookFailure",
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
		updateBookRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updateBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateBookFailure(state, action) {
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
export default BookUpdateModel;
