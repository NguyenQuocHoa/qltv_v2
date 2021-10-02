import { notification } from "antd";
import { getUserDetail } from "../../services/user";
const UserDetailModel = {
	namespace: "userDetail",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*getUserDetailRequest({ id }, { call, put }) {
			const response = yield call(getUserDetail, id);
			const { message } = response;
			if (response.status === 404) {
				notification.error({
					message: message
				});
				yield put({
					type: "getUserDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getUserDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getUserDetailRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		getUserDetailSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		getUserDetailFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserDetailModel;
