import { notification } from "antd";
import { deleteUser } from "../../services/user";
const UserDeleteModel = {
	namespace: "userDelete",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteUserRequest({ id }, { call, put }) {
			const response = yield call(deleteUser, id);
			if (response.code === 200) {
				notification.success({
					message: response.message
				});
				yield put({
					type: "deleteUserSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Xóa nhân viên " + response.message
				});
				yield put({
					type: "deleteUserFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteUserRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		deleteUserSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		deleteUserFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserDeleteModel;
