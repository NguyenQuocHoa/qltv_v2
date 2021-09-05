import { notification } from "antd";
import { getPermissionGroupDetail } from "../../services/permissionGroup";

const PermissionGroupDetailModel = {
	namespace: "permissionGroupDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getPermissionGroupDetailRequest({ id }, { call, put }) {
			const response = yield call(getPermissionGroupDetail, id);
			const { message } = response;
			if (response.status === 404) {
				notification.error({
					message: message
				});
				yield put({
					type: "getPermissionGroupDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getPermissionGroupDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getPermissionGroupDetailRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getPermissionGroupDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getPermissionGroupDetailFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default PermissionGroupDetailModel;
