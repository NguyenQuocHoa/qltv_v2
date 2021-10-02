import { notification } from "antd";
import { updateUser } from "../../services/user";
const UserUpdateModel = {
	namespace: "userUpdate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*updateUserRequest({ payload }, { call, put }) {
			const { formData, id } = payload;
			const response = yield call(updateUser, id, formData);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật thông tin nhân viên thành công!"
				});
				yield put({
					type: "updateUserSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Không thể cập nhật thông tin nhân viên!"
				});
				yield put({
					type: "updateUserFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateUserRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		updateUserSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		updateUserFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserUpdateModel;
