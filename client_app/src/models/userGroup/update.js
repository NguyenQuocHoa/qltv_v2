import { notification } from "antd";
import { updateUserGroup } from "../../services/userGroup.js";
const UserGroupUpdateModel = {
	namespace: "userGroupUpdate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*updateUserGroupRequest({ payload }, { call, put }) {
			const response = yield call(updateUserGroup, payload);
			const { message } = response;
			if (response.status === 0) {
				yield put({
					type: "updateUserGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "updateUserGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateUserGroupRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		updateUserGroupSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		updateUserGroupFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserGroupUpdateModel;
