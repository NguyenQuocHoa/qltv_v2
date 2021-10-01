import { notification } from "antd";
import { getAllBook, getAllBookEnoughInventory } from "../../services/book";

const generateHashmap = bookArr => {
	let hashmap = {};
	bookArr.forEach(b => {
		hashmap[b.id] = {
			id: b.id,
			bookCode: b.bookCode,
			bookName: b.bookName
		};
	});
	return hashmap;
};

const BookAllModel = {
	namespace: "bookAll",
	state: {
		hashmap: {},
		payload: [],
		success: false,
		failure: false
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
		*getAllBookEnoughInventoryRequest({ payload }, { call, put }) {
			const response = yield call(getAllBookEnoughInventory, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBookEnoughInventorySuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBookEnoughInventoryFailure",
					payload: response
				});
			}
		}
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
		getAllBookEnoughInventoryRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getAllBookEnoughInventorySuccess(state, action) {
			let bookArr = [];
			if (Array.isArray(action?.payload?.items)) {
				bookArr = action?.payload?.items;
			}
			let hashmap = generateHashmap(bookArr);
			return {
				...state,
				hashmap,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAllBookEnoughInventoryFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BookAllModel;
