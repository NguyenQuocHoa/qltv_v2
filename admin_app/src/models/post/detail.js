import { notification } from "antd";
import { getPostDetail } from "../../services/post";

const PostDetailModel = {
	namespace: "postDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getPostDetailRequest({ id }, { call, put }) {
			const response = yield call(getPostDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getPostDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getPostDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getPostDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getPostDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getPostDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default PostDetailModel;
