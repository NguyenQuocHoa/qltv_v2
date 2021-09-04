import { notification } from "antd";
import { updatePermissionGroup } from "../../services/permissionGroup";

const PermissionGroupUpdateModel = {
	namespace: "permissionGroupUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updatePermissionGroupRequest({ payload }, { call, put }) {
			const response = yield call(updatePermissionGroup, payload);
			if (response?.code == 200) {
				notification.success({
					message: "Cập nhật thông tin nhóm quyền thành công!"
				});
				yield put({
					type: "updatePermissionGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra"
				});
				yield put({
					type: "updatePermissionGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updatePermissionGroupRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updatePermissionGroupSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updatePermissionGroupFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default PermissionGroupUpdateModel;
