import { notification } from "antd";
import { deleteBook } from "../../services/book";

const BookDeleteModel = {
	namespace: "bookDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteBookRequest({ id }, { call, put }) {
			const response = yield call(deleteBook, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa sách"
				});
				yield put({
					type: "deleteBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteBookFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BookDeleteModel;
