import { notification } from "antd";
import { createBook } from "../../services/book";

const BookCreateModel = {
	namespace: "bookCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createBookRequest({ payload }, { call, put }) {
			const response = yield call(createBook, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Thêm sách mới thành công"
				});
				yield put({
					type: "createBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createBookFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BookCreateModel;
