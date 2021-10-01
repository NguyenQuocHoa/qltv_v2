import { notification } from "antd";
import { getPostPaging, getAllPost } from "../../services/post";

const AllPostModel = {
	namespace: "postList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allPosts: [],
		allPostSuccess: false,
		allPostFailure: false
	},
	effects: {
		*getAllPostRequest({ payload }, { call, put }) {
			const response = yield call(getAllPost, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllPostSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllPostFailure",
					payload: response
				});
			}
		},
		*getPostPagingRequest({ payload }, { call, put }) {
			const response = yield call(getPostPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getPostPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getPostPagingSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllPostRequest(state, action) {
			return {
				...state,
				allPostSuccess: false,
				allPostFailure: false
			};
		},
		getAllPostSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allPostSuccess: true,
				allPostFailure: false
			};
		},
		getAllPostFailure(state, action) {
			return {
				...state,
				allPostSuccess: false,
				allPostFailure: true
			};
		},

		getPostPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getPostPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getPostPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllPostModel;
