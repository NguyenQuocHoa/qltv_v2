import { notification } from "antd";
import { updateBookCategory } from "../../services/bookCategory";

const BookCategoryUpdateModel = {
	namespace: "bookCategoryUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateBookCategoryRequest({ payload }, { call, put }) {
			const response = yield call(updateBookCategory, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật loại sách thành công"
				});
				yield put({
					type: "updateBookCategorySuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updateBookCategoryFailure",
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
		updateBookCategoryRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updateBookCategorySuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateBookCategoryFailure(state, action) {
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
export default BookCategoryUpdateModel;
