import { notification } from "antd";
import { createPermissionGroup } from "../../services/permissionGroup";

const GroupPermissionCreateModel = {
	namespace: "permissionGroupCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createPermissionGroupRequest({ payload }, { call, put }) {
			const response = yield call(createPermissionGroup, payload);
			if (response?.code == 200) {
				notification.success({
					message: "Thêm nhóm quyền mới thành công"
				});
				yield put({
					type: "createPermissionGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra."
				});
				yield put({
					type: "createPermissionGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createPermissionGroupRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createPermissionGroupSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createPermissionGroupFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default GroupPermissionCreateModel;
