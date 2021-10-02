import { notification } from "antd";
import { deleteBookCategory } from "../../services/bookCategory";

const BookCategoryDeleteModel = {
	namespace: "bookCategoryDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteBookCategoryRequest({ id }, { call, put }) {
			const response = yield call(deleteBookCategory, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa loại sách"
				});
				yield put({
					type: "deleteBookCategorySuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteBookCategoryFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteBookCategoryRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteBookCategorySuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteBookCategoryFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BookCategoryDeleteModel;
