import { notification } from "antd";
import { getAllAllBook, getAllBook } from "../../services/book";

const AllBookModel = {
	namespace: "bookList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allBooks: [],
		allBookSuccess: false,
		allBookFailure: false
	},
	effects: {
		*getAllBookRequest({ payload }, { call, put }) {
			const response = yield call(getAllBook, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBookFailure",
					payload: response
				});
			}
		},
		// *getAllAllBookRequest(_, { call, put }) {
		// 	const response = yield call(getAllAllBook);
		// 	if (response.status === 400) {
		// 		notification.error({
		// 			message: response.message
		// 		});
		// 		yield put({
		// 			type: "getAllAllBookFailure",
		// 			payload: response
		// 		});
		// 	} else {
		// 		yield put({
		// 			type: "getAllAllBookSuccess",
		// 			payload: response
		// 		});
		// 	}
		// }
	},
	reducers: {
		getAllBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getAllBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAllBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		},

		getAllAllBookRequest(state, action) {
			return {
				...state,
				allBooks: [],
				allBookSuccess: false,
				allBookFailure: false
			};
		},
		getAllAllBookSuccess(state, action) {
			return {
				...state,
				allBooks: action.payload,
				allBookSuccess: true,
				allBookFailure: false
			};
		},
		getAllAllBookFailure(state, action) {
			return {
				...state,
				allBookSuccess: false,
				allBookFailure: true
			};
		}
	}
};
export default AllBookModel;
