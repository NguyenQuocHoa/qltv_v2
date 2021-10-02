import { notification } from "antd";
import { createPost } from "../../services/post";

const PostCreateModel = {
	namespace: "postCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createPostRequest({ payload }, { call, put }) {
			const response = yield call(createPost, payload);
			if (response?.code === 201) {
				notification.success({
					message: "Thêm bài viết mới thành công"
				});
				yield put({
					type: "createPostSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createPostFailure",
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
		createPostRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createPostSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createPostFailure(state, action) {
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
export default PostCreateModel;
