import { notification } from "antd";
import { getPermissionGroupList } from "../../services/permissionGroup";

const PermissionGroupListModel = {
	namespace: "permissionGroupList",
	state: {
		payload: [],
		success: false,
		failure: false
	},
	effects: {
		*getPermissionGroupListRequest({ payload }, { call, put }) {
			const response = yield call(getPermissionGroupList, payload);
			if (response.status === 0) {
				yield put({
					type: "getPermissionGroupListSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getPermissionGroupListFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getPermissionGroupListRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getPermissionGroupListSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getPermissionGroupListFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default PermissionGroupListModel;
