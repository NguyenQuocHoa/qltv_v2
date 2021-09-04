import { notification } from "antd";
import { createUserGroup } from "../../services/userGroup.js";
const UserGroupCreateModel = {
	namespace: "userGroupCreate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*createUserGroupRequest({ payload }, { call, put }) {
			const response = yield call(createUserGroup, payload);
			const { message } = response;
			if (response.status === 0) {
				yield put({
					type: "createUserGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "createUserGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createUserGroupRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		createUserGroupSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		createUserGroupFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserGroupCreateModel;
