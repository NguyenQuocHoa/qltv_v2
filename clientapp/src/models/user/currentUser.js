import { notification } from "antd";
import { getCurrentUser } from "../../services/user";
const CurrentUserModel = {
	namespace: "currentUser",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*getCurrentUserRequest(_, { call, put }) {
			const response = yield call(getCurrentUser);
			const { message } = response;
			if (response.status === 404) {
				notification.error({
					message: message
				});
				yield put({
					type: "getCurrentUserFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getCurrentUserSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getCurrentUserRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		getCurrentUserSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		getCurrentUserFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default CurrentUserModel;
