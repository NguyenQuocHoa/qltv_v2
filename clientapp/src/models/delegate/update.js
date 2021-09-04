import { notification } from "antd";
import { updateUserRole } from "../../services/delegate";

const delegateUpdateModel = {
	namespace: "delegateUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateUserRoleRequest({ payload }, { call, put }) {
			const response = yield call(updateUserRole, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật thông tin phân quyền thành công!"
				});
				yield put({
					type: "updateUserRoleSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. " + response?.message
				});
				yield put({
					type: "updateUserRoleFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateUserRoleRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updateUserRoleSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateUserRoleFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default delegateUpdateModel;
