import { notification } from "antd";
import { deletePost } from "../../services/post";

const PostDeleteModel = {
	namespace: "postDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deletePostRequest({ id }, { call, put }) {
			const response = yield call(deletePost, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa bài viết"
				});
				yield put({
					type: "deletePostSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deletePostFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deletePostRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deletePostSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deletePostFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default PostDeleteModel;
