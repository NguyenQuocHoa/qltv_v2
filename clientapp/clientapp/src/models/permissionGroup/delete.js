import { notification } from "antd";
import { deletePermissionGroup } from "../../services/permissionGroup";

const PermissionGroupDeleteModel = {
	namespace: "permissionGroupDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deletePermissionGroupRequest({ id }, { call, put }) {
			const response = yield call(deletePermissionGroup, id);
			if (response?.code == 200) {
				notification.success({
					message: "Đã xóa nhóm quyền!"
				});
				yield put({
					type: "deletePermissionGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra khi xóa nhóm quyền"
				});
				yield put({
					type: "deletePermissionGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deletePermissionGroupRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deletePermissionGroupSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deletePermissionGroupFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default PermissionGroupDeleteModel;
