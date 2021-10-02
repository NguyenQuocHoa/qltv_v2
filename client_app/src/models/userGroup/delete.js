import { notification } from "antd";
import { deleteUserGroup } from "../../services/userGroup.js";
const UserGroupDeleteModel = {
	namespace: "userGroupDelete",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteUserGroupRequest({ id }, { call, put }) {
			const response = yield call(deleteUserGroup, id);
			const { message } = response;
			if (response.status === 0) {
				yield put({
					type: "deleteUserGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteUserGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteUserGroupRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		deleteUserGroupSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		deleteUserGroupFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserGroupDeleteModel;
