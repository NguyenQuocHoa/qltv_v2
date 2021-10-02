import { notification } from "antd";
import { getUserGroupDetail } from "../../services/userGroup.js";
const UserGroupDetailModel = {
	namespace: "userGroupDetail",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*getUserGroupDetailRequest({ id }, { call, put }) {
			const response = yield call(getUserGroupDetail, id);
			const { message } = response;
			if (response.status === 404) {
				notification.error({
					message: message
				});
				yield put({
					type: "getUserGroupDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getUserGroupDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getUserGroupDetailRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		getUserGroupDetailSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		getUserGroupDetailFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserGroupDetailModel;
