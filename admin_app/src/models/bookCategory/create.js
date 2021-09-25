import { notification } from "antd";
import { createBookCategory } from "../../services/bookCategory";

const BookCategoryCreateModel = {
	namespace: "bookCategoryCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createBookCategoryRequest({ payload }, { call, put }) {
			const response = yield call(createBookCategory, payload);
			if (response?.code === 201) {
				notification.success({
					message: "Thêm loại sách mới thành công"
				});
				yield put({
					type: "createBookCategorySuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createBookCategoryFailure",
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
		createBookCategoryRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createBookCategorySuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createBookCategoryFailure(state, action) {
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
export default BookCategoryCreateModel;
