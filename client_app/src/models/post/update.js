import { notification } from "antd";
import { updatePost } from "../../services/post";

const PostUpdateModel = {
	namespace: "postUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updatePostRequest({ payload }, { call, put }) {
			const response = yield call(updatePost, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật bài viết thành công"
				});
				yield put({
					type: "updatePostSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updatePostFailure",
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
		updatePostRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updatePostSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updatePostFailure(state, action) {
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
export default PostUpdateModel;
